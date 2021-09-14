import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Id generator
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

//Styled components
import styled from 'styled-components';
import {
  DropDown,
  ItemContainer,
  Title,
  TimeButton,
  Button,
  MainContainer,
} from '../styles/index';

const addTask = ({route, navigation}: {route: object; navigation: object}) => {
  const {pendingTasksFromState} = route.params;
  //Dropdown states
  const [openRemind, setOpenRemind] = useState(false);
  const [valueRemind, setValueRemind] = useState(null);
  const [itemsRemind, setItemsRemind] = useState([
    {label: '5 minutes early', value: '5'},
    {label: '10 minutes early', value: '10'},
    {label: '30 minutes early', value: '30'},
  ]);
  const [openRepeat, setOpenRepeat] = useState(false);
  const [valueRepeat, setValueRepeat] = useState(null);
  const [itemsRepeat, setItemsRepeat] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
  ]);

  //Prevents except 'VirtualizedLists should never be nested inside plain ScrollViews'
  DropDownPicker.setListMode('SCROLLVIEW');

  //Date picker states
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  //Input states wich will be saved
  const [taskTitle, saveTaskTitle] = useState('');
  const [taskDeadLine, saveTaskDeadLine] = useState('');
  const [taskStartTime, saveTaskStartTime] = useState('');
  const [taskEndTime, saveTaskEndTime] = useState('');
  const [taskReminder, saveTaskReminder] = useState('');
  const [taskRepeat, saveTaskRepeat] = useState('');

  //Deadline picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    saveTaskDeadLine(date.toLocaleDateString('es-ES'));
    hideDatePicker();
  };

  //Start time picker
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (hour: Date) => {
    const options: object = {hour: 'numeric', minute: '2-digit'};
    saveTaskStartTime(hour.toLocaleTimeString([], options));
    hideStartTimePicker();
  };

  //End time picker
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (hour: Date) => {
    const options: object = {hour: 'numeric', minute: '2-digit'};
    saveTaskEndTime(hour.toLocaleTimeString([], options));
    hideEndTimePicker();
  };

  //Functions that close other pickers
  const onRemindOpen = useCallback(() => {
    setOpenRepeat(false);
  }, []);

  const onRepeatOpen = useCallback(() => {
    setOpenRemind(false);
  }, []);

  const reminderTime = (reminder: string) => {
    saveTaskReminder(reminder);
  };

  const repeatFrecuency = (reminder: string) => {
    saveTaskRepeat(reminder);
  };

  //Save task in storage
  const saveTaks = async (tasks: object) => {
    try {
      let taskStorage: string | null | object[] = await AsyncStorage.getItem(
        'task',
      );
      taskStorage = JSON.parse(taskStorage);
      if (Array.isArray(taskStorage)) {
        const newTask = [tasks, ...taskStorage];
        console.log('añado + de 1');
        await AsyncStorage.setItem('task', JSON.stringify(newTask));
      } else {
        console.log('menos');
        const taskStr = [tasks];
        await AsyncStorage.setItem('task', JSON.stringify(taskStr));
      }
    } catch (error) {
      console.log(error, 'no paso el if');
    }
  };

  //Function that validate user inputs (only if they're not blank)
  const validateInputs = () => {
    if (
      taskTitle.trim() == '' ||
      taskDeadLine.trim() == '' ||
      taskStartTime.trim() == '' ||
      taskEndTime.trim() == '' ||
      taskReminder.trim() == '' ||
      taskRepeat.trim() == ''
    ) {
      Alert.alert('Falta completar campos');
    } else {
      const newTask: object = {
        taskTitle,
        taskDeadLine,
        taskStartTime,
        taskEndTime,
        taskReminder,
        taskRepeat,
        taskId: uuidv4(),
        taskDone: false,
      };
      if (pendingTasksFromState) {
        let pendingTask = JSON.parse(pendingTasksFromState);
        pendingTask = [newTask, ...pendingTask];
        saveTaks(newTask);
        goMainPage(pendingTask);
      } else {
        let pendingTask = [newTask];
        saveTaks(newTask);
        goMainPage(pendingTask);
      }
    }
  };

  //Transports you to the main page, sending the task created through route params then stores it into the state
  const goMainPage = (pendingTask: object) => {
    console.log(pendingTask, 'del go mainpage');
    navigation.navigate('Inicio', {
      pendingTaskFromForm: JSON.stringify(pendingTask),
    });
  };

  //Extending styles
  const Titles = styled(Title)({fontSize: 17});
  const ButtonTitle = styled(Title)({
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'normal',
  });

  return (
    <MainContainer>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ItemContainer>
          <Titles>Title</Titles>
          <TextInput
            placeholder="Design team meeting"
            onChangeText={(text: string) => saveTaskTitle(text)}
          />
        </ItemContainer>
        <ItemContainer>
          <Titles>Deadline</Titles>
          <TimeButton onPress={() => showDatePicker()} underlayColor="">
            <Text style={styles.timeText}>
              {taskDeadLine !== '' ? taskDeadLine : '09/08/2021'}
            </Text>
          </TimeButton>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </ItemContainer>
        <ItemContainer>
          <View style={styles.dates}>
            <View>
              <Titles>Start time</Titles>
              <TimeButton
                onPress={() => showStartTimePicker()}
                underlayColor="">
                <Text style={styles.timeText}>
                  {taskStartTime !== '' ? taskStartTime : '00:00'} &#10674;
                </Text>
              </TimeButton>
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartTime}
                onCancel={hideStartTimePicker}
                is24Hour={true}
              />
            </View>
            <View>
              <Titles>End time</Titles>
              <TimeButton onPress={() => showEndTimePicker()} underlayColor="">
                <Text style={styles.timeText}>
                  {taskEndTime !== '' ? taskEndTime : '00:00'} &#10674;
                </Text>
              </TimeButton>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndTime}
                onCancel={hideEndTimePicker}
                is24Hour={true}
              />
            </View>
          </View>
        </ItemContainer>
        <Titles>Remind</Titles>
        <ItemContainer>
          <DropDown
            zIndex={150000}
            open={openRemind}
            value={valueRemind}
            items={itemsRemind}
            setOpen={setOpenRemind}
            setValue={setValueRemind}
            setItems={setItemsRemind}
            onOpen={onRemindOpen}
            onChangeValue={(reminder: string) => reminderTime(reminder)}
          />
        </ItemContainer>
        <ItemContainer>
          <Titles>Repeat</Titles>
          <DropDown
            open={openRepeat}
            value={valueRepeat}
            items={itemsRepeat}
            setOpen={setOpenRepeat}
            setValue={setValueRepeat}
            setItems={setItemsRepeat}
            onOpen={onRepeatOpen}
            onChangeValue={(reminder: string) => repeatFrecuency(reminder)}
          />
        </ItemContainer>
      </ScrollView>
      <Button onPress={() => validateInputs()} underlayColor="#1c9956">
        <ButtonTitle>Create a task</ButtonTitle>
      </Button>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  dates: {
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 16,
    letterSpacing: 0.25,
    color: '#a8a8a8',
    textTransform: 'uppercase',
    textAlign: 'left',
    width: '100%',
  },
});

export default addTask;
