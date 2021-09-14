import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
const DoneTaskCheckbox = ({task}: {task: Tasks}) => {
  return (
    <>
      <BouncyCheckbox
        disabled
        isChecked={true}
        style={{marginTop: 10}}
        size={25}
        textStyle={{textDecorationLine: 'none'}}
        fillColor="#cc4e67"
        unfillColor="#FFFFFF"
        text={task.taskTitle}
        iconStyle={{borderColor: '#cc4e67', borderRadius: 10}}
        onPress={() => {}}
      />
    </>
  );
};

export default DoneTaskCheckbox;
