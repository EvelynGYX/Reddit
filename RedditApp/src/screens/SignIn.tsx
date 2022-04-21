import React, {useContext} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {AuthContext, IAuthContext} from './App';

const SignIn = (props: {navigation: any}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authContext = useContext(AuthContext) as IAuthContext;

  const signIn = authContext.signIn;

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <View style={styles.container}>
        <TextInput
          style={{...styles.marginBottom, ...styles.textInput}}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{...styles.marginBottom, ...styles.textInput}}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{...styles.marginBottom}}>
          <Button
            title="Sign in"
            onPress={!!signIn && (() => signIn(username, password))}
          />
        </View>
        <View style={{...styles.marginBottom}}>
          <Button
            title="Go to Sign Up"
            onPress={() => props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  textInput: {
    fontSize: 20,
  },
});

export default SignIn;
