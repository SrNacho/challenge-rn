import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//react navigation
import {} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from './views/inicio';
import addTask from './views/addTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={{
              title: 'To-Do App',
            }}
          />
          <Stack.Screen name="addTask" component={addTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
