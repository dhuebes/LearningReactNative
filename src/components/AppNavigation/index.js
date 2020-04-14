import React, { Component, useState } from 'react';
import { TouchableOpacity, StyleSheet, View} from 'react-native';
import { Feather } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack';

import ProductList from '../ProductList';
import Profile from '../Profile';
import BookDetail from '../BookDetail';
import Tabs from '../Tabs';  

import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from '../../amplify-config';
Amplify.configure(amplifyConfig);

function MyFavBooks({ navigation }) {
    //let session = await Auth.currentSession();
    //console.log(session);
    return (
        <View>
            <ProductList findNewBook={false} navigation={navigation} showAllBooks={false}></ProductList>
        </View>
    );
}
function MyAllFavBooks({ navigation }) {
    //let session = await Auth.currentSession();
    //console.log(session);
    return (
        <View>
            <ProductList findNewBook={false} navigation={navigation} showAllBooks={true}></ProductList>
        </View>
    );
}

const Stack = createStackNavigator();
export default class AppNavigation extends Component {
    state = {
        showAllBooks: false
    }

    logout = async () => {
        Auth.signOut({ global: true })
            .then((data) => this.props.handleClearSession())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>    
                <Stack.Navigator initialRouteName="Meus Livros">
                    <Stack.Screen 
                    name="Meus Livros" 
                    component={this.state.showAllBooks ? MyAllFavBooks : MyFavBooks} 
                    options={{
                        headerTitleAlign: 'center', 
                        headerLeft: () => (
                            <TouchableOpacity>
                            <Feather 
                                name="book-open" 
                                size={28} 
                                style={[styles.showAllBookHeaderIcon, this.state.showAllBooks ? {color: '#0D0D0D'} : {color: '#bfbfbf'} ]} 
                                onPress={() => this.setState({ showAllBooks : !this.state.showAllBooks})}/>
                            </TouchableOpacity>
                        )/*,
                        headerRight: () => (
                            <TouchableOpacity>
                            <Feather name="log-out" size={28} style={styles.logouHeaderIcon} onPress={this.logout}/>
                            </TouchableOpacity>
                        )*/
                    }}
                    />
        
                    <Stack.Screen name="Buscar" component={ProductList} 
                    options={ 
                        {headerLeft: null},
                        {headerTitleAlign: 'center'}       
                    }
                    extra
                    />
        
                    <Stack.Screen name="Detalhe" component={BookDetail} 
                    options={ 
                        {headerTitleAlign: 'center'}
                    }
                    />
                    
                    <Stack.Screen name="Usuário" component={Profile} 
                        options={ 
                            {headerTitleAlign: 'center'}
                        }
                        initialParams={{ handleClearSession: this.props.handleClearSession }}
                    />
                </Stack.Navigator>
                <Tabs nav={this.props.navigationRef}></Tabs>
            </>
        );
    }    
}

const styles = StyleSheet.create({
  showAllBookHeaderIcon: {
    marginLeft: 20
  },

  logouHeaderIcon: {
    marginRight: 20,
  }
});