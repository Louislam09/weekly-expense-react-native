import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import LangContext from '../contexts/LangContext'
import { CURRENT_PAGE } from '../utils/constants'

export default function SetBudgetBox({ budget, setBudget, setCurrentPage, updateStorageBudget }) {
    const { APP_NAME, HOME } = useContext(LangContext)

    const addBudget = () => {
        if (!budget) {
            Alert.alert(HOME?.ERROR_MESSAGE)
            return
        }
        updateStorageBudget(+budget)
        setCurrentPage(CURRENT_PAGE.MAIN);
    }

    return (
        <View style={styles.container}  >
            <Text style={styles.title}>{APP_NAME || ''}</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{HOME?.BUDGET_BOX_TITLE || ''}</Text>

                <View style={styles.formInputs}>
                    <TextInput
                        onChangeText={setBudget}
                        defaultValue={`${budget}`}
                        keyboardType='decimal-pad'
                        placeholder='$1000'
                        style={styles.input}
                    />
                </View>

                <Pressable style={styles.formSubmitButton} onPress={addBudget}>
                    <Text style={styles.formSubmitButtonText}>{HOME?.ADD_BUDGET_BUTTON || ''}</Text>
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
    formInputs: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 15
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#dfdfdf'
    },
    formLabel: {
        marginVertical: 5,
    },
    formSubmitButton: {
        backgroundColor: '#32C3F0',
        width: '90%',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10
    },
    formSubmitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});