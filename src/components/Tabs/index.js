import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const Tabs = () => (
    <View style={styles.container}>
        <Icon name="clone" size={20} style={styles.icon}/>
        <Icon name="search" size={20} style={styles.icon}/>
        <View style={styles.main}>
            <Icon name="plus" size={20} style={styles.mainicon}/>
        </View>        
        <Icon name="bell-o" size={20} style={styles.icon}/>
        <Icon name="user-o" size={20} style={styles.icon}/>
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
