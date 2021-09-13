import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddForm from '../componentes/AddForm';

interface params {
  route: object;
  navigation: object;
}

const addTask = ({route, navigation}: params) => {
  const {pendingTaskss} = route.params;
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
