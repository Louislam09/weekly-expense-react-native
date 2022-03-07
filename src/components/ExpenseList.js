import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useContext } from 'react'
import ExpenseItem from './ExpenseItem'
import LangContext from '../contexts/LangContext'


const ExpenseList = ({ storedExpenses }) => {
    const { MAIN } = useContext(LangContext)

    return (
        <View style={styles.expenseListContainer}>
            <Text style={styles.expenseListTitle}>{MAIN.EXPENSE_LIST.TITLE}</Text>
            <FlatList
                style={styles.expenseListContent}
                data={storedExpenses}
                renderItem={({ item }) => <ExpenseItem item={item} />}
                ItemSeparatorComponent={() => <Text style={styles.separator} />}
                ListEmptyComponent={() => <Text style={styles.emptyList}>{MAIN.EXPENSE_LIST.EMPTY_LIST_MESSAGE}</Text>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    expenseListContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        width: '90%',
        paddingVertical: 20,
    },
    expenseListTitle: {
        marginTop: 5,
        fontSize: 24,
        color: '#004E90',
        marginBottom: 15,
        textTransform: "uppercase",
        textDecorationColor: '#004E90',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
    expenseListContent: {
        width: '100%',
        paddingHorizontal: 20,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#dededf'
    },
    emptyList: {
        width: '100%',
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#dededf75',
        paddingVertical: 10,
        borderRadius: 5
    }
})

export default ExpenseList