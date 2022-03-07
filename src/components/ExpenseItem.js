import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ExpenseItem = ({ item }) => {
    const { name, amount } = item;
    return (
        <View style={styles.expenseItemContainer}>
            <Text style={styles.expenseItemName}>{name}</Text>
            <Text style={styles.expenseItemAmount}>$ {amount}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    expenseItemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    expenseItemName: {
        fontWeight: '500'
    },
    expenseItemAmount: {
        fontWeight: 'bold',
        backgroundColor: '#0A4785',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
})
export default ExpenseItem