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
import amplifyConfig from '../../../amplify-config'

Amplify.configure({Auth: amplifyConfig});

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      resetCode: '',
      newPassword: '',
      errorMessage: '',
      resetPassword: false,
      recoverButtonText: 'RECUPERAR',
      inInput: false
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword = () => {
    console.log(this.state);
    if(this.state.resetPassword === true) {
      Auth.forgotPasswordSubmit(this.state.username, this.state.resetCode, this.state.newPassword)
        .then(() => { this.props.navigation.navigate('Signin')})
        .catch(err => {this.setState({ errorMessage: err.message }) });
    } else {
      Auth.forgotPassword(this.state.username)
        .then(() => {this.setState({ resetPassword: true }) })
        .catch(err => {this.setState({ errorMessage: err.message }) });
    }
  }

  renderIf = (condition, content) => {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  resetPasswordFields = () => {
    return (
      <View>
        <TextInput
          style = {styles.forgot_password_input}
          onChangeText = {(resetCode) => this.setState({resetCode})}
          placeholder = "CÓDIGO"
          autoCapitalize = "none"
          onFocus = { () => this.setState({inInput: true})}
          onBlur = { () => this.setState({inInput: false})}          
          keyboardType = "numeric"
          underlineColorAndroid = "#fff"/>
        <TextInput
          style = {styles.forgot_password_input}
          onChangeText = {(newPassword) => this.setState({newPassword})}
          placeholder = "NOVA SENHA"
          autoCapitalize = "none"
          onFocus = { () => {
            this.setState({newPassword: ""}); 
            this.setState({recoverButtonText: 'GRAVAR'})
            this.setState({inInput: true})
          }}
          onBlur = { () => this.setState({inInput: false})}
          secureTextEntry = { true }
          underlineColorAndroid = "#fff"/>
      </View>
    )
  }

  render() {
    return(
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios" ? "padding" : "height"}
        style = {styles.forgot_password_container}
      >
        <ScrollView
          contentContainerStyle = {styles.forgot_password_container}
          keyboardShouldPersistTaps='never'
          scrollEnabled={false}
        >
          <View style={styles.forgot_password_form_container}>
            <Text style={styles.forgot_password_text}>
              RECUPERAR 
            </Text>
            <Text style={styles.forgot_password_text}>
              SENHA
            </Text>            
            <Text>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style = {styles.forgot_password_input}
              onChangeText = {(username) => this.setState({username})}
              value = {this.state.username}
              placeholder = "EMAIL"
              autoCapitalize = "none"
              keyboardType = "email-address"
              onFocus = { () => this.setState({inInput: true})}
              onBlur = { () => this.setState({inInput: false})}
              underlineColorAndroid = "#fff"
            />
            {this.renderIf(this.state.resetPassword, this.resetPasswordFields())}
          </View>
          <View style={styles.forgot_password_actions_container}>
            { !this.state.inInput &&
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Signin')}>
                <Text style={styles.login_button}>
                  VOLTAR
                </Text>
              </TouchableOpacity>
            }  
            <TouchableOpacity
              onPress={this.resetPassword}
              style={styles.forgot_password_button}
            >
              <Text style={styles.forgot_password_button_text}>
                {this.state.recoverButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    fullSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    forgot_password_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forgot_password_form_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgot_password_text: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 10
    },
    forgot_password_input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        textAlign: 'left',
        fontSize: 15
    },
    forgot_password_actions_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxHeight: 100
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
    forgot_password_button: {
        backgroundColor: '#000',
        width: Dimensions.get('window').width,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgot_password_button_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 10
    },
});