import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native';
import {AuthContext, IAuthContext} from './App';

const Home = () => {
  const authContext = useContext(AuthContext) as IAuthContext;
  const {signOut} = authContext;

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
};

export default Home;
