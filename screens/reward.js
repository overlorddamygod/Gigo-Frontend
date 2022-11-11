import { Button, Input, Text } from '@ui-kitten/components'
import React from 'react'
import SafeAreaView from '../components/SafeAreaView'
import useUserStore from '../store';
import { axiosInstance } from '../utils/axios';
import showToast from '../utils/toast';
import { AsyncStorage } from 'react-native';

const RewardScreen = ({route: {params}}) => {
    const [weight, setWeight] = React.useState(1);
    const user = useUserStore(store=>store)
    const send = async () => {
        try {

            const pk = await AsyncStorage.getItem(`pk_${user.name}`);
            console.log("PRIVATE KEY", pk)
    
            const {data } = await axiosInstance.post("/users/transfer-coin/", {
                iroha_name: params.data,
                private_key: pk
            })
            console.log("SENT", data)
            showToast("Successfully sent")
        } catch(err) {
            console.log("SEND ERROR", err.response?.data)
            showToast("Error sending")
        }
    }
    return (
        <SafeAreaView>
            <Text>Reward</Text>
            <Text>{params.data}</Text>
            <Input value={weight}
            placeholder='Weight'
            onChangeText={nextValue => setWeight(nextValue)}>
            </Input>
            <Button onPress={send}>Send</Button>
        </SafeAreaView>
    )
}

export default RewardScreen