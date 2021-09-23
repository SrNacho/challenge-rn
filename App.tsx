import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {styles} from './styles';
import mainPage from './views/mainPage';
import addTask from './views/addTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen
            name="mainpage"
            component={mainPage}
            options={{
              title: 'To-Do App',
              headerRight: () => (
                <View style={styles.navigationHeaderButtonsContainer}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={styles.navigationHeaderButtons}
                    size={18}
                  />
                  <FontAwesomeIcon
                    icon={faBell}
                    style={styles.navigationHeaderButtons}
                    size={18}
                  />
                  <FontAwesomeIcon
                    icon={faBars}
                    style={styles.navigationHeaderButtons}
                    size={18}
                  />
                </View>
              ),
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle,
            }}
          />

          <Stack.Screen
            name="addTask"
            component={addTask}
            options={{
              title: 'Add task',
              headerTitleStyle: styles.headerTitleStyle,
              headerStyle: styles.headerStyle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
