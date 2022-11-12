import { Button, Input, Text } from '@ui-kitten/components'
import React from 'react'
import SafeAreaView from '../components/SafeAreaView'
import useUserStore from '../store';
import { axiosInstance } from '../utils/axios';
import showToast from '../utils/toast';
import { AsyncStorage } from 'react-native';

const TransactionsScreen = ({navigation}) => {
    
    return (
        <Text>Transaction</Text>
    )
}

export default TransactionsScreen