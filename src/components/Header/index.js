import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({title}) => (
    <View style={styles.container}>
        
        <Text> </Text>
        <Text style={styles.title}>{title}</Text>
        <Icon name="ellipsis-h" size={22} style={styles.icon}/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        height: 35,
        borderColor: '#eee',
        borderBottomWidth: 1
    },

    icon: {
        color: '#FF9982'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18
        
    }
});

export default Header;

