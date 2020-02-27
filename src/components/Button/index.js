import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Button = ({ children, type, style }) => (
   <TouchableOpacity style={[
       styles.container,
       style,
       type ? styles[`button-${type}`] : {}
    ]}>
       <Text style={[
           styles.text,
           type ? styles[`text-${type}`] : {}
        ]}>{children}</Text>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        height: 31,
        backgroundColor: '#FF9982',
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },

    text: {
        color: '#FFF'
    },

    'button-outline': {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#FF9982'
    },

    'text-outline': {
        color: '#FF9982'
    },

});

export default Button;