import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TaskInterface } from '../interfaces/index';

const DoneTaskCheckbox = ({task}: {task: TaskInterface}) => {
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
