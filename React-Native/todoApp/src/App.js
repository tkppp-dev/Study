import React, { useState } from "react";
import { StatusBar, Dimensions } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./theme";
import Input from "./components/Input";
import Task from "./components/Task";
import AppLoading from "expo-app-loading";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${(props) => props.width - 40}px;
`;

export default App = () => {
  const width = Dimensions.get("window").width;
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({}); // 배열대신 객체를 쓰는 이유 : 식별자를 통한 수정, 삭제를 원할하게 하기 위함

  const _saveTasks = async function (tasks) {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const _loadTasks = async function () {
    try {
      const loadedTasks = await AsyncStorage.getItem("tasks");
      setTasks(JSON.parse(loadedTasks) || {});
    } catch (err) {
      console.error(err);
    }
  };

  const _handleTextChange = function (text) {
    setNewTask(text);
  };

  const _addTask = function () {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: {
        id: ID,
        text: newTask,
        completed: false,
      },
    };
    setNewTask("");
    _saveTasks({ ...newTaskObject, ...tasks });
  };

  const _updateTask = function (item) {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _deleteTask = function (id) {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _toggleCheckBox = function (id) {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id].completed = !currentTasks[id].completed;
    _saveTasks(currentTasks);
  };

  const _onBlur = function () {
    setNewTask("");
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>Todo List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks).map((item) => (
            <Task
              key={item.id}
              item={item}
              toggleCheckBox={_toggleCheckBox}
              updateTask={_updateTask}
              deleteTask={_deleteTask}
            />
          ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};
