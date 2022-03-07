import { StyleSheet } from 'react-native'
import React from 'react'
import SetBudgetBox from '../components/SetBudget'

export default function Home(props) {
    return (
        <>
            <SetBudgetBox {...props} />
        </>
    )
}

const styles = StyleSheet.create({})