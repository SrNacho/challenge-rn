import React from 'react';
import {FlatList, View} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Components
import UndoneTaskCheckbox from '../componentes/UndoneTaskCheckbox';
import DoneTaskCheckbox from '../componentes/DoneTaskCheckbox';
//Styles
import styled from 'styled-components';
import {MainContainer, Button, Title} from '../styles/index';
import { TaskInterface } from '../interfaces/index';

const Inicio = ({route, navigation}: {route: object; navigation: object}) => {
  const [pendingTasks, setPendingTasks] = useState<TaskInterface[]>();
  const [doneTasks, setDoneTasks] = useState<TaskInterface[]>();

  const goAddTask = () => {
    navigation.navigate('addTask', {
      pendingTasksFromState: JSON.stringify(pendingTasks),
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      //await AsyncStorage.removeItem('task');
      try {
        let taskStorage: string| TaskInterface[] | null = await AsyncStorage.getItem('task'); // AsyncStorage will still getting the same elements from storage, no matter if the UseEffect is loaded again. This is the because of the if(route.params)
        taskStorage? taskStorage = JSON.parse(taskStorage) : null;
        console.log(taskStorage, 'del taskstorage');
        let newDoneTasks: TaskInterface[] = [];
        let newPendingTasks: TaskInterface[] = [];
        if (taskStorage) {
          const isDone = taskStorage.map((task: TaskInterface) => {
            task.taskDone
              ? newDoneTasks.push(task)
              : newPendingTasks.push(task);
          });
        }
        if (route.params) {
          console.log('here');
          const {pendingTaskFromForm} = route.params;
          let pendingTaskForm = JSON.parse(pendingTaskFromForm);
          console.log(pendingTaskForm);
          setPendingTasks(pendingTaskForm);
        } else {
          setPendingTasks(newPendingTasks);
          setDoneTasks(newDoneTasks);
        }
      } catch (error) {
        console.log(error, 'Error en inicio');
      }
    };
    getTasks();
  }, [route.params]); //When route.params changes, useEffect executes again.

  const taskDoneValidation = ({item}: {item: TaskInterface}) => {
    if (item.taskDone === true) {
      return <DoneTaskCheckbox task={item} />;
    }
  };

  const pendingTask = ({item}: {item: TaskInterface}) => {
    if (item.taskDone === false) {
      return <UndoneTaskCheckbox taskName={item} setDone={setDoneTasks} />;
    }
  };

  //Change Title style to be used as a text button
  const ButtonText = styled(Title)({
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'normal',
  });

  return (
    <>
      <MainContainer>
        <Title>Completed tasks</Title>
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            nestedScrollEnabled
            data={doneTasks}
            renderItem={taskDoneValidation}
            keyExtractor={tasks => tasks.taskId}
          />
          <Title>Pending Tasks</Title>
          <FlatList
            style={{flex: 1}}
            nestedScrollEnabled
            data={pendingTasks}
            renderItem={pendingTask}
            keyExtractor={tasks => tasks.taskId}
          />
        </View>
        <Button onPress={() => goAddTask()} underlayColor="#1c9956">
          <ButtonText>Add a task</ButtonText>
        </Button>
      </MainContainer>
    </>
  );
};

export default Inicio;
