import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Alert, Pressable, TextInput } from 'react-native'
import LangContext from '../contexts/LangContext'

const ExpenseForm = ({ updateStorageExpenses, storedExpenses }) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const { APP_NAME, MAIN } = useContext(LangContext)

    const addExpense = async () => {
        if (!name || !amount) {
            Alert.alert(MAIN.EXPENSE_FORM.FORM_ERROR_MESSAGE);
            return;
        }
        const newExpense = { name, amount, id: storedExpenses.length + 1 };
        await updateStorageExpenses([...storedExpenses, newExpense])
        setAmount(0)
        setName('')
    }

    return (
        <View style={styles.container}  >
            <Text style={styles.title}>{APP_NAME}</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>{MAIN.EXPENSE_FORM.FORM_TITLE}</Text>

                <View style={styles.formInputs}>
                    <Text style={styles.formLabel}>{MAIN.EXPENSE_FORM.FORM_LABEL_NAME}</Text>
                    <TextInput value={name} onChangeText={setName} placeholder={MAIN.EXPENSE_FORM.FORM_NAME_PLACEHOLDER} style={styles.input} />
                </View>
                <View style={styles.formInputs}>
                    <Text style={styles.formLabel}>{MAIN.EXPENSE_FORM.FORM_LABEL_AMOUNT}</Text>
                    <TextInput value={`${amount}`} onChangeText={(value) => setAmount(+value)} keyboardType='decimal-pad' placeholder={MAIN.EXPENSE_FORM.FORM_AMOUNT_PLACEHOLDER} style={styles.input} />
                </View>

                <Pressable style={styles.formSubmitButton} onPress={addExpense}>
                    <Text style={styles.formSubmitButtonText}>{MAIN.EXPENSE_FORM.FORM_BUTTON_ADD}</Text>
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
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
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
        fontWeight: 'bold'

    }
});

export default ExpenseForm