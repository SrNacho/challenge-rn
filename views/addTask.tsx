import React, {useCallback, useState} from 'react';
import {Text, View, TextInput, ScrollView, Alert, Platform} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import styled from 'styled-components';
import {
  styles,
  DropDown,
  ItemContainer,
  Title,
  TimeButton,
  Button,
  MainContainer,
  MainContainerChild,
  DatesContainer,
  LabelTimeButton,
  NavigatorSeparator,
} from './styles';
import {TaskInterface} from '../interfaces/index';
import {v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';

const addTask = ({route, navigation}: {route: object; navigation: object}) => {
  const remindFrecuency = [
    {label: '5 minutes early', value: '5'},
    {label: '10 minutes early', value: '10'},
    {label: '30 minutes early', value: '30'},
  ];

  const repeatFrecuency = [
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
  ];

  const {pendingTasksFromState} = route.params;
  const [openRemind, setOpenRemind] = useState(false);
  const [valueRemind, setValueRemind] = useState(null);
  const [itemsRemind, setItemsRemind] = useState(remindFrecuency);
  const [openRepeat, setOpenRepeat] = useState(false);
  const [valueRepeat, setValueRepeat] = useState(null);
  const [itemsRepeat, setItemsRepeat] = useState(repeatFrecuency);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [taskTitle, saveTaskTitle] = useState('');
  const [taskDeadLine, saveTaskDeadLine] = useState('');
  const [taskStartTime, saveTaskStartTime] = useState('');
  const [taskEndTime, saveTaskEndTime] = useState('');
  const [taskReminder, saveTaskReminder] = useState('');
  const [taskRepeat, saveTaskRepeat] = useState('');

  //Prevents except 'VirtualizedLists should never be nested inside plain ScrollViews'
  DropDownPicker.setListMode('SCROLLVIEW');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    saveTaskDeadLine(date.toLocaleDateString('es-ES').replaceAll('/', '-'));
    hideDatePicker();
  };

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

  const onRemindOpen = useCallback(() => {
    setOpenRepeat(false);
  }, []);

  const onRepeatOpen = useCallback(() => {
    setOpenRemind(false);
  }, []);

  const saveRemindTime = (reminder: string) => {
    saveTaskReminder(reminder);
  };

  const saveRepeatFrecuency = (reminder: string) => {
    saveTaskRepeat(reminder);
  };

  const saveTaks = async (tasks: TaskInterface) => {
    try {
      let taskStorage: string | null | TaskInterface[] =
        await AsyncStorage.getItem('task');
      taskStorage ? (taskStorage = JSON.parse(taskStorage)) : null;
      if (Array.isArray(taskStorage)) {
        const newTask = [tasks, ...taskStorage];
        await AsyncStorage.setItem('task', JSON.stringify(newTask));
      } else {
        const taskStr = [tasks];
        await AsyncStorage.setItem('task', JSON.stringify(taskStr));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInputs = () => {
    if (
      taskTitle.trim() == '' ||
      taskDeadLine.trim() == '' ||
      taskStartTime.trim() == '' ||
      taskEndTime.trim() == '' ||
      taskReminder.trim() == '' ||
      taskRepeat.trim() == ''
    ) {
      Alert.alert('Missing fields');
    } else {
      const newTask: TaskInterface = {
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
  const goMainPage = (pendingTask: object[]) => {
    navigation.navigate('mainpage', {
      pendingTaskFromForm: JSON.stringify(pendingTask),
    });
  };

  const Titles = styled(Title)({fontSize: 18});
  const ButtonTitle = styled(Title)({
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'normal',
  });

  return (
    <MainContainer>
      <NavigatorSeparator />
      <MainContainerChild>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ItemContainer>
            <Titles>Title</Titles>
            <TextInput
              placeholder="Design team meeting"
              onChangeText={(text: string) => saveTaskTitle(text)}
              style={styles.timeText}
            />
          </ItemContainer>
          <ItemContainer>
            <Titles>Deadline</Titles>
            <TimeButton onPress={() => showDatePicker()} underlayColor="">
              <Text style={styles.timeText}>
                {taskDeadLine !== '' ? taskDeadLine : '09-08-2021'}
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
            <DatesContainer>
              <View style={styles.timeButtonItems}>
                <Titles>Start time</Titles>
                <TimeButton
                  onPress={() => showStartTimePicker()}
                  underlayColor="">
                  <LabelTimeButton>
                    <Text style={styles.timeText}>
                      {taskStartTime !== '' ? taskStartTime : '00:00'}
                    </Text>
                    <View style={styles.icons}>
                      <FontAwesomeIcon icon={faClock} style={styles.icons} />
                    </View>
                  </LabelTimeButton>
                </TimeButton>
                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmStartTime}
                  onCancel={hideStartTimePicker}
                  is24Hour={true}
                />
              </View>
              <View style={styles.timeButtonItems}>
                <Titles>End time</Titles>
                <TimeButton
                  onPress={() => showEndTimePicker()}
                  underlayColor="">
                  <LabelTimeButton>
                    <Text style={styles.timeText}>
                      {taskEndTime !== '' ? taskEndTime : '00:00'}
                    </Text>
                    <View style={styles.icons}>
                      <FontAwesomeIcon icon={faClock} style={styles.icons} />
                    </View>
                  </LabelTimeButton>
                </TimeButton>
                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmEndTime}
                  onCancel={hideEndTimePicker}
                  is24Hour={true}
                />
              </View>
            </DatesContainer>
          </ItemContainer>
          <Titles>Remind</Titles>
          <ItemContainer {...(Platform.OS === 'ios' ? {zIndex: 10} : {})}>
            <DropDown
              placeholderStyle={styles.placeHolderStyle}
              zIndex={5500}
              open={openRemind}
              value={valueRemind}
              items={itemsRemind}
              setOpen={setOpenRemind}
              setValue={setValueRemind}
              setItems={setItemsRemind}
              onOpen={onRemindOpen}
              onChangeValue={(reminder: string) => saveRemindTime(reminder)}
            />
          </ItemContainer>
          <ItemContainer>
            <Titles>Repeat</Titles>
            <DropDown
              placeholderStyle={styles.placeHolderStyle}
              open={openRepeat}
              value={valueRepeat}
              items={itemsRepeat}
              setOpen={setOpenRepeat}
              setValue={setValueRepeat}
              setItems={setItemsRepeat}
              onOpen={onRepeatOpen}
              onChangeValue={(reminder: string) =>
                saveRepeatFrecuency(reminder)
              }
            />
          </ItemContainer>
        </ScrollView>
      </MainContainerChild>
      <Button onPress={() => validateInputs()} underlayColor="#1c9956">
        <ButtonTitle>Create a task</ButtonTitle>
      </Button>
    </MainContainer>
  );
};

export default addTask;
