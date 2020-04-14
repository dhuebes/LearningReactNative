import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';   

//<SafeAreaView style={{marginTop: -50}} forceInset={{'top': 'never'}}>
const Tabs = ({nav}) => (
//function Tabs({navigationRef}) {
    
    <SafeAreaView style={{marginTop: -50}} forceInset={{'top': 'never'}}>
    <View style={styles.container}>        
        <TouchableOpacity style={styles.iconView} 
            onPress={ () => nav.current.navigate('Meus Livros', {})}>
            <Icon name="home" size={22} style={styles.icon}/> 
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.main} 
            onPress={ () => nav.current.navigate('Buscar', { findNewBook : true })}
        >
            <Icon name="plus" size={22} style={styles.mainicon}/>
        </TouchableOpacity>            

        <TouchableOpacity style={styles.iconView}
            onPress={ () => nav.current.navigate('Usuário')}
        >
            <Icon name="user-o" size={22} style={styles.icon}/>
        </TouchableOpacity>    
    </View>
    </SafeAreaView>
    
);

/*

        <TouchableOpacity style={styles.main}>
            <Icon name="plus" size={20} style={styles.mainicon}/>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.iconView}>
            <Icon name="bell-o" size={20} style={styles.icon}/>
        </TouchableOpacity>
*/

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: 50,
        borderTopWidth: 1,
        borderColor: '#eee',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        
    },

    icon: {
      color: '#C0C0C0'
    },

    iconView: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '20%',
    },
  
    active: {
      color: '#FF9982'
    },

    main: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF9982',
        justifyContent: "center",
        alignItems: "center"
    },

    mainicon: {
        color: '#FFF'
    }
});

export default Tabs
