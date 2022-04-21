import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Splash from './Splash';
import Help from './Help';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuthContext {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
}

interface IAppState {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
  isSignedIn: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = AuthContext.Provider;

export const AuthContextConsumer = AuthContext.Consumer;

const Stack = createNativeStackNavigator();

const isSignedIn = (userToken: string | null) => {
  return userToken !== null;
};

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isSignedIn: isSignedIn(action.token),
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isSignedIn: isSignedIn(action.token),
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isSignedIn: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isSignedIn: isSignedIn(null),
    } as IAppState,
  );

  const authContext: IAuthContext = useMemo(
    () =>
      ({
        signIn: async (username: string, password: string) => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `SecureStore`
          // In the example, we'll use a dummy token
          await AsyncStorage.setItem('@user_token', 'dummy-auth-token');
          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        },

        signOut: async () => {
          await AsyncStorage.removeItem('@user_token');
          dispatch({type: 'SIGN_OUT'});
        },

        signUp: async (username: string, password: string) => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `SecureStore`
          // In the example, we'll use a dummy token
          await AsyncStorage.setItem('@user_token', 'dummy-auth-token');
          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        },
      } as IAuthContext),
    [],
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = () => {
      let userToken;
      let timeout;

      try {
        timeout = setTimeout(async () => {
          userToken = await AsyncStorage.getItem('@user_token');

          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({type: 'RESTORE_TOKEN', token: userToken});
        }, 3000);
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();

    return () => clearTimeout(5000);
  }, []);

  if (state.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContextProvider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: 'Sign In',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: 'Sign Up', headerShown: true}}
              />
            </>
          )}
          <Stack.Group navigationKey={state.isSignedIn ? 'user' : 'guest'}>
            <Stack.Screen name="Help" component={Help} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
