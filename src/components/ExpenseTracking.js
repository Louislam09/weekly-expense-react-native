import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useMemo } from 'react'
import LangContext from '../contexts/LangContext';
import { CURRENT_PAGE } from '../utils/constants';

const ExpenseTracking = ({ storedBudget, storedExpenses, updateStorageExpenses, setCurrentPage }) => {
    const { MAIN } = useContext(LangContext)
    const remaining = useMemo(() => storedExpenses.reduce((prev, curr) => prev - curr.amount, storedBudget), [storedExpenses]);

    const resetList = async () => {
        await updateStorageExpenses([])
    }

    const resetBudget = async () => {
        await updateStorageExpenses([])
        setCurrentPage(CURRENT_PAGE.HOME)
    }

    return (
        <View style={styles.expenseTrackingContainer}>
            <Text style={styles.budgetBox}>{MAIN.EXPENSE_TRACKING.BUDGET_LABEL}: ${+storedBudget}</Text>
            <Text style={[styles.remainingBox, (remaining < 0 && styles.remainingBoxNegative)]}>{MAIN.EXPENSE_TRACKING.REMAINING_LABEL}: ${+remaining}</Text>

            <View style={styles.expenseTrackingActionButtons}>
                <Pressable style={[styles.actionButton, styles.action1]} onPress={resetList}>
                    <Text style={styles.actionLabel1}>{MAIN.EXPENSE_TRACKING.CLEAN_LIST_BUTTON}</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.action2]} onPress={resetBudget}>
                    <Text style={styles.actionLabel2}>{MAIN.EXPENSE_TRACKING.RESET_BUDGET_BUTTON}</Text>
                </Pressable>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    expenseTrackingContainer: {
        margin: -1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        width: '90%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    budgetBox: {
        width: '100%',
        color: '#0A4785',
        fontSize: 20,
        fontWeight: '400',
        backgroundColor: '#CBE5FE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5

    },
    remainingBox: {
        width: '100%',
        color: '#0F3412',
        fontSize: 20,
        fontWeight: '400',
        backgroundColor: '#D4EDDA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5
    },
    remainingBoxNegative: {
        color: '#910000',
        backgroundColor: '#ffadad69',
    },
    expenseTrackingActionButtons: {
        marginVertical: 10,
        marginTop: 15,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        // flexDirection: 'row',
        justifyContent: 'space-around'
    },
    actionButton: {
        width: '100%',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10,
        borderColor: 'orange',
        borderWidth: 1,
    },
    action1: {
        borderColor: '#ffa500',
        color: '#ffa500'
    },
    action2: {
        borderColor: '#ff0000',
        color: '#f00',
    },
    actionLabel1: {
        color: '#ffa500',
        fontWeight: 'bold'
    },
    actionLabel2: {
        color: '#f00',
        fontWeight: 'bold'
    },
})

export default ExpenseTracking
