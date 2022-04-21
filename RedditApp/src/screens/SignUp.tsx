import React, {useContext} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {AuthContext, IAuthContext} from './App';

const SignUp = (props: {navigation: any}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authContext = useContext(AuthContext) as IAuthContext;

  const signUp = authContext.signUp;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={{...styles.marginBottom}}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{...styles.marginBottom}}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={'Sign Up'}
          onPress={!!signUp && (() => signUp(username, password))}
        />
        <Button
          title={'Go back to Sign In'}
          onPress={() => props.navigation.goBack()}
        />
        <Button
          title={'Push to Help'}
          onPress={() => props.navigation.push('Help')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
});

export default SignUp;
