import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const StyledInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.main,
}))`
  width: ${(props) => props.width - 40}px;
  height: 60px;
  margin: 20px 0px;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.itemBackground};
  font-size: 25px;
  color: ${(props) => props.theme.text};
`;

const Input = (props) => {
  const width = Dimensions.get("window").width;
  return (
    <StyledInput
      placeholder={props.placeholder}
      width={width}
      value={props.value}
      onChangeText={props.onChangeText}
      onSubmitEditing={props.onSubmitEditing}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      onBlur={props.onBlur}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default Input;
