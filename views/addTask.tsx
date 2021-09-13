import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddForm from '../componentes/AddForm';

interface params {
  route: object;
  navigation: object;
}

const addTask = ({route, navigation}: params) => {
  const {pendingTaskss} = route.params;
  //Pending tasks are send by route params in string format because cannot send functions over it. Also I didn't found a way to refresh the 'doneTasks' state in the Inicio.tsx so implemented this.
  return (
    <>
      <View style={styles.contenedor}>
        <AddForm
          navigation={navigation}
          pendingTasksFromState={pendingTaskss}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: '3%',
    flex: 1,
  },
});

export default addTask;
