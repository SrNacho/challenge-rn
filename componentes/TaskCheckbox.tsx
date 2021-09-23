import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskInterface} from '../interfaces/index';
import {styles} from './styles';

interface Props {
  taskName: TaskInterface;
  bouncyProps?: object;
  setDone?: (obj: TaskInterface[]) => void;
}

const TaskCheckbox = ({taskName, setDone = () => null}: Props) => {
  const addDoneTask = async () => {
    try {
      let taskStorage: string | TaskInterface[] | null =
        await AsyncStorage.getItem('task');
      if (taskStorage) {
        taskStorage = JSON.parse(taskStorage);
        let newTaskStorage: TaskInterface[] = [];
        const isDone = taskStorage.map((task: TaskInterface) => {
          if (task.taskId !== taskName.taskId) {
            newTaskStorage.push(task);
          }
        });
        taskName['taskDone'] = true;
        const newTask = [taskName, ...newTaskStorage];
        setDone(newTask);
        await AsyncStorage.setItem('task', JSON.stringify(newTask));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BouncyCheckbox
      disabled={taskName.taskDone ? true : false}
      isChecked={taskName.taskDone ? true : false}
      style={styles.checkBox}
      size={25}
      textStyle={styles.text}
      fillColor="#FC5146"
      unfillColor="#FFFFFF"
      text={taskName.taskTitle}
      iconStyle={
        taskName.taskDone ? styles.iconStyleDone : styles.iconStyleUndone
      }
      onPress={addDoneTask}
    />
  );
};

export default TaskCheckbox;
