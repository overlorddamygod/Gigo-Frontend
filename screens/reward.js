import { Input, Text } from '@ui-kitten/components'
import React from 'react'
import SafeAreaView from '../components/SafeAreaView'

const RewardScreen = ({route: {params}}) => {
    const [weight, setWeight] = React.useState(1);

    return (
        <SafeAreaView>
            <Text>Reward</Text>
            <Text>{params.data}</Text>
            <Input value={weight}
            placeholder='Weight'
            onChangeText={nextValue => setWeight(nextValue)}>
            </Input>
        </SafeAreaView>
    )
}

export default RewardScreen