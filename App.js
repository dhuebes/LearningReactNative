import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import api from './src/services/api';
import Header from './src/components/Header';
import SubHeader from './src/components/SubHeader';
import ProductList from './src/components/ProductList';
import Tabs from './src/components/Tabs';  

import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from './src/components/BookDetail';

const Tab = createBottomTabNavigator();

function MyFavBooks({ navigation }) {
  return (
    <View>
      <ProductList findNewBook={false} navigation={navigation} showAllBooks={false}></ProductList>
    </View>
  );
}

function MyAllFavBooks({ navigation }) {
  return (
    <View>
      <ProductList findNewBook={false} navigation={navigation} showAllBooks={true}></ProductList>
    </View>
  );
}

const Stack = createStackNavigator();
export const navigationRef = React.createRef();


function AppNavigation() {
  const [showAllBooks, setshowAllBooks] = useState(false);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Meus Livros">
        <Stack.Screen 
          name="Meus Livros" 
          component={showAllBooks ? MyAllFavBooks : MyFavBooks} 
          options={{
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity>
                  <Feather name="book-open" size={28} style={styles.headerIcon} onPress={() => setshowAllBooks(!showAllBooks)}/>
                </TouchableOpacity>
              )
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

  headerIcon: {
    marginRight: 20,
  }

});

export default class App extends React.Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}