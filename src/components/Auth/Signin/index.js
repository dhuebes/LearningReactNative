import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  View } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from '../../../amplify-config';
Amplify.configure({ Auth: amplifyConfig });

export default class Signin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      inInput: false
    };
    this.signInUser = this.signInUser.bind(this);
  }

  signInUser = () => {
    
    Auth.signIn (this.state.email, this.state.password)
      .then(user => { this.props.route.params.handleSetSession(user)})
      .catch(err => { this.setState({ errorMessage: err.message }) });
    //console.log(this.state);
  };

  render() {
    
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.signin_container}
      >
        
        <ScrollView
          contentContainerStyle={styles.signin_container}
          keyboardShouldPersistTaps='never'
          scrollEnabled={false}
        >
          <View style={styles.signin_form_container}>
            <Text style={styles.signin_text}>
              SOCIAL
            </Text>
            <Text style={[styles.signin_text, { marginBottom: 30 }]}>
              BOOK
            </Text>
            <Text>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style={styles.signin_input}
              onChangeText = {(email) => this.setState({email})}
              value = {this.state.email}
              placeholder = "EMAIL"
              autoCapitalize = "none"
              onFocus = { () => this.setState({inInput: true})}
              onBlur = { () => this.setState({inInput: false})}
              underlineColorAndroid = "#fff"
            />
            <TextInput
              style={styles.signin_input}
              onChangeText = {(password) => this.setState({password})}
              value = {this.state.password}
              placeholder = "SENHA"
              autoCapitalize = "none"
              //onFocus = { () => this.setState({password: ""})}
              onFocus = { () => { this.setState({inInput: true}); this.setState({password: ""}) }}
              onBlur = { () => this.setState({inInput: false})}
              secureTextEntry = {true}
              underlineColorAndroid = "#fff"
            />
          </View>
          <View style={[styles.signin_actions_container, this.state.inInput ? { maxHeight: 100 } :  { maxHeight: 200 } ]}>
            { !this.state.inInput &&
              <>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.signup_button}>
                  CRIAR CONTA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={[styles.signup_button, { marginBottom: 30}]}>
                  ESQUECI MINHA SENHA
                </Text>
              </TouchableOpacity>
              </>
            }
            <TouchableOpacity
              onPress={this.signInUser}
              style={styles.signin_button}
            >
              <Text style={styles.signin_button_text}>
                ENTRAR
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    fullSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    signin_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signin_form_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signin_text: {
      fontSize: 20,
      color: '#000',
      fontWeight: 'bold',
      letterSpacing: 10
    },
    signin_actions_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    signin_input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'left',
        fontSize: 15
    },
    signin_button: {
        backgroundColor: '#000',
        width: Dimensions.get('window').width,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signin_button_text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '600',
        letterSpacing: 10
    },
    signup_button: {
        backgroundColor: '#fff',
        color: "#bfbfbf",
        fontWeight: 'bold',
        width: 200,
        margin: 10,
        height: 20,
        fontSize: 11,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});