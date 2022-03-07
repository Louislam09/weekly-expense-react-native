import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import Home from './src/screens/Home';
import Main from './src/screens/Main';
import useAsyncStorage from './src/hooks/useAsyncStorage';
import LangContext from './src/contexts/LangContext';
import langData from './src/utils/lang.json';
import { ASYNC_STORAGE_KEYS, CURRENT_PAGE, LANGS } from './src/utils/constants';
import SettingButton from './src/components/SettingButton';
import SettingsPage from './src/screens/Settings';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
});

const Layout = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={{ width: '100%', minHeight: '100%', overflow: 'scroll' }}>
      <ScrollView horizontal contentContainerStyle={{ width: '100%' }}>
        {children}
      </ScrollView>
    </ScrollView>
  )
}

export default function App() {
  const [storedExpenses, updateStorageExpenses] = useAsyncStorage(ASYNC_STORAGE_KEYS.EXPENSE_KEY, []);
  const [storedBudget, updateStorageBudget] = useAsyncStorage(ASYNC_STORAGE_KEYS.BUDGET_KEY, 0);
  const [currentPage, setCurrentPage] = useAsyncStorage(ASYNC_STORAGE_KEYS.CURRENT_PAGE, CURRENT_PAGE.HOME);
  const [lang, setLang] = useAsyncStorage(ASYNC_STORAGE_KEYS.LANG, LANGS.EN);
  const [budget, setBudget] = useState(storedBudget);
  const [expoToken, setExpoToken] = useState('');


  const changeLanguage = (language) => {
    console.log(`changeLanguage: ${language}`)
    setLang(language)
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoToken(token))
  }, [])

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token)
    } else { return; }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  return (
    <SafeAreaView>
      <LangContext.Provider value={langData[lang]}>
        <Layout>
          <StatusBar style="inverted" />
          <LinearGradient
            style={styles.container}
            colors={['#004e92', '#000428']}
          >
            <View style={styles.appContainer}>
              {currentPage === CURRENT_PAGE.HOME && (
                <>
                  <SettingButton {...{ setCurrentPage }} />
                  <Home
                    {...{
                      budget,
                      setBudget,
                      updateStorageBudget,
                      setCurrentPage,
                      setLang
                    }}
                  />
                </>
              )}
              {currentPage === CURRENT_PAGE.MAIN && (<Main
                {...{
                  storedBudget,
                  setCurrentPage,
                  storedExpenses,
                  updateStorageExpenses
                }}
              />)}
              {currentPage === CURRENT_PAGE.SETTING && (<SettingsPage
                {
                ...{
                  setCurrentPage,
                  changeLanguage,
                  lang,
                  storedBudget
                }
                }
              />)}
            </View>
          </LinearGradient>
        </Layout>
      </LangContext.Provider>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  appContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingVertical: 30,
  },
  langContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  langText: {
    fontSize: 24,
    color: '#fff'
  }
});

