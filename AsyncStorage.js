import React from 'react';
import {AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage'

// saveData('@1GT4BS6', {
//   year: '2011',
//   make: 'Ram',
//   model: 'Pickup 1500'
// });

const withAsyncStorage = WrappedComponent => props => {
  const saveData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      alert(value);
    } catch (e) {
      console.error(e);
    }
  };

  const multiGetData = async keys => {
    try {
      const value = await AsyncStorage.multiGet(keys);
      alert(value);
    } catch (e) {
      console.error(e);
    }
  };

  const removeData = async key => {
    try {
      const value = await AsyncStorage.removeItem(key);
      alert(value);
    } catch (e) {
      console.error(e);
    }
  };

  const multiRemoveData = async keys => {
    try {
      const value = await AsyncStorage.multiRemove(keys);
      alert(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <WrappedComponent
      {...props}
      getData={getData}
      saveData={saveData}
      removeData={removeData}
      multiGetData={multiGetData}
      multiRemoveData={multiRemoveData}
    />
  );
};

export default withAsyncStorage;
