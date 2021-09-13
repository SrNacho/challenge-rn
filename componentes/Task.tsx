import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface params {
  taskName: Tasks;
  setDone?: (obj: Tasks[]) => void;
}

const Task = ({taskName, setDone}: params) => {
  const addDoneTask = async () => {
    try {
      let taskStorage: string | Tasks[] | null = await AsyncStorage.getItem(
        'task',
      );
      if (taskStorage) {
        taskStorage = JSON.parse(taskStorage);
        let newTaskStorage: Tasks[] = [];
        const isDone = taskStorage.map((task: Tasks) => {
          if (task.taskId !== taskName.taskId) {
            newTaskStorage.push(task);
          }
        });
        taskName['taskDone'] = true;
        const newTask = [taskName, ...newTaskStorage];
        setDone(newTask);
        console.log(newTask);
        //console.log(newTask, typeof newTask);
        await AsyncStorage.setItem('task', JSON.stringify(newTask));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BouncyCheckbox
        style={{marginTop: 10}}
        size={25}
        textStyle={{textDecorationLine: 'none'}}
        fillColor="#93CCEA"
        unfillColor="#FFFFFF"
        text={taskName.taskTitle}
        iconStyle={{borderColor: 'blue', borderRadius: 10}}
        onPress={() => {
          addDoneTask();
        }}
      />
    </>
  );
};

export default Task;
