import React from 'react';
import withAsyncStorage from './AsyncStorage';
import {Text, View, TouchableOpacity} from 'react-native';

// ['@1GT4BS5', '@1GT4BS6']

const App = (props) => {
  return (
    <TouchableOpacity onPress={() => props.multiGetData(['@1GT4BS5', '@1GT4BS6'])}>
      <View>
        <Text>I'm wrapped by a higher order component</Text>
      </View>
    </TouchableOpacity>
  );
};

export default withAsyncStorage(App);
