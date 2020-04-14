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

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'Password',
      email: 'Email',
      errorMessage: '',
      infoMessage: '',
      inInput: false
    };
    this.signupUser = this.signupUser.bind(this);
  }

  signupUser = () => {
    console.log(this.state);
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        email: this.state.email
      }
    })
      .then(data => { this.props.navigation.navigate('Confirmation', data) })
      .catch(err => { this.setState({ errorMessage: err.message }) })
  }

  render() {
    return(
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style = {styles.signup_container}
      >
        <ScrollView
          contentContainerStyle = {styles.signup_container}
          keyboardShouldPersistTaps = 'never'
          scrollEnabled={false}
        >
          <View style = {styles.signup_form_container}>
            { !this.state.inInput &&
              <Text style={styles.signup_banner_text}>
                CADASTRAR-SE
              </Text>
            }  
            <Text>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style = {styles.signup_input}
              onChangeText = {(email) => this.setState({email})}
              placeholder = "EMAIL"
              autoCapitalize = "none"
              onFocus = { () => { this.setState({inInput: true}); this.setState({email: ""}) }}
              onBlur = { () => this.setState({inInput: false})}
              keyboardType = "email-address"
              underlineColorAndroid = "#fff"
            />
            <TextInput
              style = {[styles.signup_input, { marginBottom: 30 } ]}
              onChangeText = {(password) => this.setState({password})}
              placeholder = "SENHA"
              autoCapitalize = "none"
              onFocus = { () => { this.setState({inInput: true}); this.setState({password: ""}) }}
              onBlur = { () => this.setState({inInput: false})}
              secureTextEntry = { true }
              underlineColorAndroid = "#fff"
            />
            <Text style={[styles.infomessage, { fontWeight: 'bold' } ]}>
              {`A senha deve ter:`}
            </Text>
            <Text style={styles.infomessage }>
              {` No mínimo 8 caracteres \n Ao menos 1 letra maiúscula\n Símbolos\n`}
            </Text>
          </View>
          <View style = {styles.signup_actions_container}>
            { !this.state.inInput &&
              <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Signin')}>
                <Text style = {styles.login_button}>
                  VOLTAR
                </Text>
              </TouchableOpacity>
            }  
            <TouchableOpacity
              onPress = {this.signupUser}
              style = {styles.signup_button}
            >
              <Text style = {styles.signup_text}>
                ENVIAR
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    )
  }
}


const styles = StyleSheet.create({
    signup_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signup_form_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signup_banner_text: {
        width: Dimensions.get('window').width,
        height: 40,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 10,
        textAlign: 'center'
    },
    signup_input: {
        width: 200,
        height: 30,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 15
    },
    signup_actions_container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    login_button: {
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
    infomessage: {
      color: "#bfbfbf",
      fontSize: 14,
      alignContent: 'center',
      textAlign: "center"
    },
    signup_button: {
        backgroundColor: '#FF9982', //'#C4DE9F',
        width: Dimensions.get('window').width,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signup_text: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 10
    },
})