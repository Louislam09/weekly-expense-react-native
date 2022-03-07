import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import ExpenseTracking from '../components/ExpenseTracking'

export default function Main(props) {

    return (
        <>
            <ExpenseForm {...{ ...props }} />
            <ExpenseList {...{ ...props }} />
            <ExpenseTracking {...{ ...props }} />
        </>
    )
}

const styles = StyleSheet.create({})