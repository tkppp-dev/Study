import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import { images } from "../images";
import Input from "./Input"

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${(props) => (props.completed ? props.theme.done : props.theme.text)};
  text-decoration-line: ${(props) =>
    props.completed ? "line-through" : "none"};
`;

const Task = (props) => {
  const { item, toggleCheckBox, updateTask, deleteTask } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateBtnPress = function () {
    setIsEditing(true);
  };

  const _onSubmitEditing = function () {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  const _onBlur = function() {
    if(isEditing){
      setIsEditing(false)
      setText(item.text)
    }
  }
  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <Container>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        completed={item.completed}
        onPressOut={toggleCheckBox}
      />
      <Contents completed={item.completed}>{item.text}</Contents>
      {item.completed || (
        <IconButton
          type={images.update}
          id={item.id}
          completed={item.completed}
          onPressOut={_handleUpdateBtnPress}
        />
      )}
      <IconButton
        type={images.delete}
        id={item.id}
        completed={item.completed}
        onPressOut={deleteTask}
      />
    </Container>
  );
};

Task.prototype = {
  item: PropTypes.object.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;