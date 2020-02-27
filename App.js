import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';
import { render } from 'react-dom';
import api from './src/services/api';
import Header from './src/components/Header';
import SubHeader from './src/components/SubHeader';
import ProductList from './src/components/ProductList';
// import Tabs from './src/components/Tabs';  <Tabs />

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View>
      <Header title="Home" />
      <SubHeader />
    </View>
  );
}

class App extends Component {
  state = {
  }

  /*
   
        <Header />
        <ScrollView>
          <SubHeader />
          <ProductList />
        </ScrollView>  
  */

  render() {
    return (
      <View style={styles.container}> 
         
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Produtos" component={ProductList} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    //flexDirection: 
    //alignSelf
    //flexWrap: "wrap"
    //alignContent
    flex: 1,
    backgroundColor: '#F8F8FA',
    marginTop: 40
    //alignItems: 'center',
    //justifyContent: 'center',
  },

});

export default App;