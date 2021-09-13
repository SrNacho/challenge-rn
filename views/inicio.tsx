import React from 'react';
import {FlatList, View} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Components
import Task from '../componentes/Task';
import TaskDone from '../componentes/TaskDone';
//Styles
import styled from 'styled-components';
import {MainContainer, Button, Title} from '../styles/index';

interface Tasks {
  taskDeadLine: string;
  taskDone: boolean;
  taskEndTime: string;
  taskId: string;
  taskReminder: string;
  taskRepeat: string;
  taskStartTime: string;
  taskTitle: string;
}

const Inicio = ({route, navigation}: {route: object; navigation: object}) => {
  const [pendingTasks, setPendingTasks] = useState<Tasks[]>();
  const [doneTasks, setDoneTasks] = useState<Tasks[]>();

  const goAddTask = () => {
    navigation.navigate('addTask', {
      pendingTaskss: JSON.stringify(pendingTasks),
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      //await AsyncStorage.removeItem('task');
      try {
        let taskStorage: Tasks[] | string | null = await AsyncStorage.getItem(
          'task',
        );
        taskStorage = taskStorage ? JSON.parse(taskStorage) : null;
        if (taskStorage) {
          let newDoneTasks: Tasks[] = [];
          let newPendingTasks: Tasks[] = [];
          const isDone = taskStorage.map((task: Tasks) => {
            task.taskDone
              ? newDoneTasks.push(task)
              : newPendingTasks.push(task);
          });
          if (route.params) {
            const {pendingTaskFromForm} = route.params;
            let pendingTaskForm = JSON.parse(pendingTaskFromForm);
            setPendingTasks(pendingTaskForm);
          } else {
            setPendingTasks(newPendingTasks);
            setDoneTasks(newDoneTasks);
          }
        }
      } catch (error) {
        console.log(error, 'Error en inicio');
      }
    };
    getTasks();
  }, [route.params]);

  const taskDoneValidation = ({item}: {item: Tasks}) => {
    if (item.taskDone === true) {
      return <TaskDone task={item} />;
    }
  };

  const pendingTask = ({item}: {item: Tasks}) => {
    if (item.taskDone === false) {
      return <Task taskName={item} setDone={setDoneTasks} />;
    }
  };

  const ButtonTitle = styled(Title)({
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
            extraData={doneTasks}
            data={doneTasks}
            renderItem={taskDoneValidation}
            keyExtractor={tasks => tasks.taskId}
          />
          <Title>Pending Tasks</Title>
          <FlatList
            style={{flex: 1}}
            nestedScrollEnabled
            extraData={pendingTasks}
            data={pendingTasks}
            renderItem={pendingTask}
            keyExtractor={tasks => tasks.taskId}
          />
        </View>
        <Button onPress={() => goAddTask()} underlayColor="#1c9956">
          <ButtonTitle>Add a task</ButtonTitle>
        </Button>
      </MainContainer>
    </>
  );
};

export default Inicio;
