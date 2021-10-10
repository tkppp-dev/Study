import React from 'react'
import {} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.TouchableOpacity`
  background-color: #3498db;
  border-radius: 15px;
  padding: 15px 30px;
  margin: 10px 0px;
  justify-content: center;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
`

const Button = (props) => {
  return (
    <Container onPress={props.onPress}>
      <Title>{props.title}</Title>
    </Container>
  )
}

export default Button