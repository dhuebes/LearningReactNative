import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from './src/components/AppNavigation';

import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from './src/amplify-config';
Amplify.configure(amplifyConfig);

import Signin from './src/components/Auth/Signin';
import Signup from './src/components/Auth/Signup';
import Confirmation from './src/components/Auth/Confirmation';
import ForgotPassword from './src/components/Auth/ForgotPassword';

const Stack = createStackNavigator();
export const navigationRef = React.createRef();

function AppLogin(props) {

  //console.log(props);
  return (
      <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={Signin} 
            options={ 
                {headerShown: false}
            }
            initialParams={{ handleSetSession: props.handleSetSession }}
          />

          <Stack.Screen name="Signup" component={Signup} 
            options={ 
                {headerShown: false}
            }
          />    

          <Stack.Screen name="Confirmation" component={Confirmation} 
            options={ 
                {headerShown: false}
            }
          />      

          <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
            options={ 
                {headerShown: false}
            }
          />
      </Stack.Navigator>
  )    
}

export default class App extends React.Component {
  state = {
    session: null,
    loaded: false
  }

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    
    this._clearSession = this._clearSession.bind(this);
    this._setSession = this._setSession.bind(this);
  }

	_bootstrapAsync = async () => {
		try {
      let session = await Auth.currentSession();

      let userData = await Auth.currentAuthenticatedUser();
      //console.log(userData.attributes);
      AsyncStorage.setItem('@socialbook:userData:userId', userData.username);
      AsyncStorage.setItem('@socialbook:userData', JSON.stringify(userData.attributes));
      this.setState({session: session});
      this.setState({loaded: true});
		} catch (error) {
      this.setState({loaded: true});
			console.log('Current Session Error:',error);
		}
	}

  getCurrSession = async () => {
    return await Auth.currentSession();
  }

  _clearSession() {
    //alert('aa');
    AsyncStorage.clear();
    //AsyncStorage.setItem('@socialbook:userData:userId', undefined);
    //AsyncStorage.setItem('@socialbook:userData', undefined);
    this.setState({session: null});
  }

  _setSession(session) {

    Auth.currentAuthenticatedUser()
        .then(userData => { 
          //console.log(userData);
          AsyncStorage.setItem('@socialbook:userData:userId', userData.username);
          AsyncStorage.setItem('@socialbook:userData', JSON.stringify(userData.attributes));
          this.setState({session: session});
        })
        .catch(err => { this.setState({ errorMessage: err.message }) });
    
  }

  render() {              
    let layout;
    if (this.state.loaded) {
      //console.log(this.state.session);
      if (this.state.session) {
        layout = <AppNavigation navigationRef={navigationRef} handleClearSession={this._clearSession}/>
      } else {
        layout = <AppLogin handleSetSession={this._setSession}/>
      }     
    }          
                        
    return (
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>{layout}</NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

//export default withAuthenticator(App);