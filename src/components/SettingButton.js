import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CURRENT_PAGE, EMOJIS } from '../utils/constants'

export default function SettingButton({ setCurrentPage }) {
    return (
        <View style={styles.settingContainer}>
            <Pressable
                style={styles.settingButton}
                onPress={() => setCurrentPage(CURRENT_PAGE.SETTING)}
            >
                <Text style={styles.settingText}>{EMOJIS['SETTING']}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    settingText: {
        fontSize: 24,
        color: '#fff',
        padding: 0
    },
    settingContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
    },
    settingButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: '#dededf75',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 0,
    }
});