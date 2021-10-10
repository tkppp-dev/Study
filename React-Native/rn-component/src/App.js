import React from 'react'
import {Text, View, Button} from 'react-native'
import MyButton from './MyButton'
import Counter from './components/Counter'

const App = () => {
    return (
        <View style={{
            flex : 1,
            backgroundColor : '#fff',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            <Text style={{fontSize : 30, marginBottom : 10}}>Button Component</Text>
            <MyButton title="Button" onPress={() => alert('Custom Event')}/>
            <MyButton title="Button">Children</MyButton>
            <MyButton />
            <Counter></Counter>
        </View>
    )
}

export default App