import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';
import { render } from 'react-dom';
import api from './src/services/api';
import Header from './src/components/Header';
import SubHeader from './src/components/SubHeader';
import ProductList from './src/components/ProductList';
import Tabs from './src/components/Tabs';  

import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from './src/components/BookDetail';
//import { navigationRef } from './src/components/RootNavigation';

const Tab = createBottomTabNavigator();



const Remover = () => {
  alert('Removido');
}

//<SubHeader title="Nome do Livro" autor="Autor" button1="Remover" button2="Ver" button1Click={Remover} button2Click={Remover}/>
function HomeScreen({ navigation }) {
  return (
    <View>
      <ProductList findNewBook={false} navigation={navigation}></ProductList>
    </View>
  );
}

const Stack = createStackNavigator();
export const navigationRef = React.createRef();

function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Meus Livros">
        <Stack.Screen name="Meus Livros" component={HomeScreen} 
          options={ 
              {headerTitleAlign: 'center'}
          }
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
      </Stack.Navigator>
      <Tabs nav={navigationRef}></Tabs>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
    marginTop: 40
  },

});

export default class App extends React.Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}