import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, YellowBox } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

//import * as RootNavigation from '../RootNavigation';

/*
export default class Tabs extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Icon name="clone" size={20} style={styles.icon}
                    onPress={() => navigation.navigate('Buscar')}
                />
                <Icon name="search" size={20} style={styles.icon}/>
                <View style={styles.main}>
                    <Icon name="plus" size={20} style={styles.mainicon}/>
                </View>        
                <Icon name="bell-o" size={20} style={styles.icon}/>
                <Icon name="user-o" size={20} style={styles.icon}/>
            </View>

        )
    }
}
*/

const Tabs = ({nav}) => (
//function Tabs({navigationRef}) {
    
    <View style={styles.container}>        
        <TouchableOpacity style={styles.iconView} 
            onPress={ () => nav.current.navigate('Meus Livros', {})}>
            <Icon name="clone" size={20} style={styles.icon}/> 
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconView} 
            onPress={ () => nav.current.navigate('Buscar', { findNewBook : true })}>
            <Icon name="search" size={20} style={styles.icon}/>
        </TouchableOpacity>
            
        <TouchableOpacity style={styles.main}>
            <Icon name="plus" size={20} style={styles.mainicon}/>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.iconView}>
            <Icon name="bell-o" size={20} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconView}>
            <Icon name="user-o" size={20} style={styles.icon}/>
        </TouchableOpacity>    
    </View>
    
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: 50,
        paddingBottom: 0,
        borderTopWidth: 1,
        borderColor: '#eee',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 30
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
