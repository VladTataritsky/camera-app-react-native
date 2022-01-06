import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [connectionType, setConnectionType] = useState('');
  const [isConnected, setIsConnected] = useState(null);
  const unsubscribe = NetInfo.addEventListener(state => {
    if (connectionType !== state.type) {
      setConnectionType(state.type);
    }
    if (isConnected !== state.isConnected) {
      setIsConnected(state.isConnected);
    }
  });

  useEffect(() => {
    if (isConnected === false) {
      Snackbar.show({
        text: 'Looks like we cannot detect an internet connection. Please check your connection',
        duration: 6000,
      });
    }
  }, [isConnected]);

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <View>
      <Text>ConnectionType: {connectionType}</Text>
    </View>
  );
};

export default App;
