import React from 'react';
import {FlatList, View} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCheckbox from '../componentes/TaskCheckbox';
import {TaskInterface} from '../interfaces/index';
import {
  Title,
  Button,
  MainContainer,
  ButtonText,
  ListContainer,
  styles,
  MainContainerChild,
} from './styles';
import styled from 'styled-components';
import {NavigatorSeparator} from './styles';

const mainPage = ({route, navigation}: {route: object; navigation: object}) => {
  const [pendingTasks, setPendingTasks] = useState<TaskInterface[]>();
  const [doneTasks, setDoneTasks] = useState<TaskInterface[]>();

  const goAddTask = () => {
    navigation.navigate('addTask', {
      pendingTasksFromState: JSON.stringify(pendingTasks),
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        let taskStorage: string | TaskInterface[] | null =
          await AsyncStorage.getItem('task'); // AsyncStorage will still getting the same elements from storage, no matter if the UseEffect is loaded again. This is the because of the if(route.params)
        taskStorage ? (taskStorage = JSON.parse(taskStorage)) : null;
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
  }, [route.params]);

  const taskDoneValidation = ({item}: {item: TaskInterface}) => {
    if (item.taskDone === true) {
      return <TaskCheckbox taskName={item} />;
    }
  };

  const pendingTask = ({item}: {item: TaskInterface}) => {
    if (item.taskDone === false) {
      return <TaskCheckbox taskName={item} setDone={setDoneTasks} />;
    }
  };

  const ChildMainContainer = styled(MainContainerChild)({
    marginVertical: 20,
  });

  return (
    <MainContainer>
      <NavigatorSeparator />
      <ChildMainContainer>
        <ListContainer>
          <Title>Completed tasks</Title>
          <View style={styles.flatListCompleted}>
            <FlatList
              nestedScrollEnabled
              data={doneTasks}
              renderItem={taskDoneValidation}
              keyExtractor={tasks => tasks.taskId}
            />
          </View>
          <Title>Pending Tasks</Title>
          <View style={styles.flatListUncompleted}>
            <FlatList
              nestedScrollEnabled
              data={pendingTasks}
              renderItem={pendingTask}
              keyExtractor={tasks => tasks.taskId}
            />
          </View>
        </ListContainer>
      </ChildMainContainer>
      <Button onPress={() => goAddTask()} underlayColor="#1c9956">
        <ButtonText>Add a task</ButtonText>
      </Button>
    </MainContainer>
  );
};

export default mainPage;
