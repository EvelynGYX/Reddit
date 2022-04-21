import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

const Help = (props: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Help</Text>
      <Button
        title="Go back to Sign In as top"
        onPress={() => props.navigation.popToTop()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Help;
