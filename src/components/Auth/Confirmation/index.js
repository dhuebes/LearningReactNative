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

Amplify.configure({Auth: amplifyConfig});


export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props?.route?.params?.user?.username,
      confirmation_code: '',
      errorMessage: '',
      inInput: false
    };
    this.confirmUser = this.confirmUser.bind(this);
  }

  confirmUser = () => {
    Auth.confirmSignUp(this.state.username, this.state.confirmation_code)
      .then(() => { this.props.navigation.navigate('Signin')} )
      .catch(err => { this.setState({ errorMessage: err.message }) });
  };

  render() {
    return(
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios" ? "padding" : "height"}
        style = {styles.fullSize}
      >
        <ScrollView
          contentContainerStyle = {styles.confirmation_code_container}
          keyboardShouldPersistTaps='never'
          scrollEnabled={false}
        >
          <View style={styles.confirmation_code_container}>
            <Text style={styles.confirmation_text}>
              VERIFICAR
            </Text>
            <Text style={styles.confirmation_text}>
              E-MAIL
            </Text>
            <Text>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style = {styles.confirmation_input}
              onChangeText = {(username) => this.setState({username})}
              value = {this.state.username}
              placeholder = "EMAIL"
              keyboardType = "email-address"
              autoCapitalize = "none"
              underlineColorAndroid = "#fff"
              onFocus = { () => this.setState({inInput: true})}
              onBlur = { () => this.setState({inInput: false})}
            />
            <TextInput
              style = {styles.confirmation_input}
              onChangeText = {(confirmation_code) => this.setState({confirmation_code})}
              placeholder = "CÓDIGO DE CONFIRMAÇÃO"
              autoCapitalize = "none"
              //onFocus = { () => this.setState({confirmation_code: ""})}
              onFocus = { () => this.setState({inInput: true})}
              onBlur = { () => this.setState({inInput: false})}
              keyboardType = "numeric"
              underlineColorAndroid = "#fff"/>

          </View>
          <View style={ styles.confirmation_actions_container }>
            { !this.state.inInput &&
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Signin')}>
                <Text style={styles.login_button}>
                  VOLTAR
                </Text>
              </TouchableOpacity>
            }  
            <TouchableOpacity
              onPress={this.confirmUser}
              style={styles.confirmation_button}
            >
              <Text style={styles.confirmation_button_text}>
                CONFIRMAR
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
    confirmation_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    confirmation_code_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmation_text: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 10
    },
    confirmation_input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        textAlign: 'left',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 20,
    },
    confirmation_actions_container: {
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
        margin: 11,
        height: 20,
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    confirmation_button: {
        backgroundColor: '#FF9982', //'#C4DE9F',
        width: Dimensions.get('window').width,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmation_button_text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 10,
    },
});