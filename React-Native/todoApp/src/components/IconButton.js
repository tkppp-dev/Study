import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { images } from "../images";

const Icon = styled.Image`
  tint-color: ${(props) =>
    props.completed ? props.theme.done : props.theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`;

const IconButton = (props) => {
  const _onPressOut = () => {
    props.onPressOut(props.id);
  };
  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon completed={props.completed} source={props.type}></Icon>
    </TouchableOpacity>
  );
};

IconButton.propsTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
};

export default IconButton;
