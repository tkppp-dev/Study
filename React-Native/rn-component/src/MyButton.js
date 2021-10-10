import React from 'react'
import { TouchableOpacity ,Pressable, Text } from 'react-native'
import PropTypes from 'prop-types'

const MyButton = (props) => {
    return (
        <TouchableOpacity style={{
            backgroundColor : '#3498db',
            padding : 12,
            margin : 8,
            borderRadius : 8
        }} 
        onPress={props.onPress}>
            <Text style={{ color : 'white', fontSize : 20 }}>
                {props.children || props.title}
            </Text>
        </TouchableOpacity>
    )
}

MyButton.defaultProps = {
    title : 'Button',
    onPress : function(){
        alert('Default Click Event')
    }
}

MyButton.propTypes = {
    title : PropTypes.string.isRequired,
    onPress : PropTypes.func
}

export default MyButton