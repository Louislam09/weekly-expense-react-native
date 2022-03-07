import { Alert, Pressable, StyleSheet, Text, Switch, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import LangContext from '../contexts/LangContext'
import { ASYNC_STORAGE_KEYS, CURRENT_PAGE, EMOJIS, LANGS } from '../utils/constants'
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function SettingContent({ setCurrentPage, changeLanguage, lang, storedBudget }) {
    const { SETTING, APP_NAME, NOTIFICATION_DESCRIPTION } = useContext(LangContext)
    const [isNotification, setNotification] = useAsyncStorage(ASYNC_STORAGE_KEYS.NOTIFICATION, false);
    const [selectedLanguage, setSelectedLanguage] = useState(lang);
    const [isFirst, setFirst] = useState(true)

    useEffect(() => {
        setSelectedLanguage(lang)
    }, [lang])

    useEffect(() => {
        if (isFirst) {
            setFirst(false)
            return;
        }
        changeLanguage(selectedLanguage)
    }, [selectedLanguage])

    const handleNotification = async () => {
        if (isNotification) {
            try {
                await Notifications.cancelAllScheduledNotificationsAsync()

            } catch (error) {
                Alert.alert(error)
            }
        } else {
            try {
                let schedule = new Date()
                schedule.setDate(schedule.getDay() + 1)
                schedule.setHours(7)
                schedule.setMinutes(0)
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `📢 ${APP_NAME.toLowerCase()}`,
                        subtitle: `${NOTIFICATION_DESCRIPTION}`,
                        body: `Your budget is ${EMOJIS.DOLLAR} ${storedBudget}`
                    },
                    trigger: {
                        date: schedule,
                        repeats: true
                    }
                })
                console.log('Notification scheduled')
            } catch (error) {
                Alert.alert(error)
            }
        }
        setNotification(!isNotification)
    }

    return (
        <View style={styles.container}  >
            <Text style={styles.title}>{SETTING?.TITLE || ''}</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{SETTING?.SETTING_SUBTITLE || ''}</Text>

                <View style={styles.switchContainer}>
                    <Text style={styles.switch_label}>{SETTING?.LANG_LABEL || ''}</Text>
                    <Picker
                        style={styles.picket}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item
                            label={`${EMOJIS.EN} English`}
                            style={styles.picket_item}
                            value={LANGS.EN}
                        />
                        <Picker.Item
                            label={`${EMOJIS.ES} Spanish`}
                            style={styles.picket_item}
                            value={LANGS.ES}
                        />
                    </Picker>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switch_label}>{SETTING?.NOTIFICATION_LABEL || ''}</Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#767577", true: "#CBE5FE" }}
                        thumbColor={isNotification ? "#32C3F0" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleNotification}
                        value={isNotification}
                    />
                </View>
                <Text style={styles.switch_description} >
                    {SETTING?.NOTIFICATION_NOTE || ''}
                </Text>

                <Pressable style={styles.formSubmitButton} onPress={() => setCurrentPage(CURRENT_PAGE.HOME)}>
                    <Text style={styles.formSubmitButtonText}>{SETTING?.BACK_BUTTON || ''}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 40,
        color: '#fff',
        textTransform: 'capitalize'
    },
    formContainer: {
        position: 'relative',
        marginTop: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 15,
        paddingVertical: 20
    },
    formTitle: {
        fontSize: 24,
        color: '#004E90',
        marginBottom: 15
    },
    formSubmitButton: {
        backgroundColor: '#32C3F0',
        width: '90%',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 30
    },
    formSubmitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    switchContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    switch_label: {
        fontSize: 18,
        color: '#004e92',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    switch_description: {
        width: '100%',
        paddingHorizontal: 20,
        fontSize: 12,
        color: '#004a72',
    },
    switch: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
    },
    picket: {
        flex: .65,
        // marginLeft: 0,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    picket_item: {
        color: '#767577',
        fontWeight: '100',
        fontSize: 20,
    }
});