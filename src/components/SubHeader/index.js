import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import  Button  from '../Button/index';


const SubHeader = ({image, title, autor, button1, button2, button1Click}) => (
    <View style={styles.container}>
        <Image 
            style={styles.avatar}
            source={{ uri: image}}
        />

        <View style={styles.profileInfo}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.bio}>{autor}</Text>

            <View style={styles.buttonContainer}>
                <Button style={styles.firstButton} onPress={button1Click}>{button1}</Button>
                { (button2 != '' &&
                    <Button type="outline">{button2}</Button>
                )}
                
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: "row"
    },

    avatar: {
        width: 60,
        height: 80,
        //borderRadius: 40,
        marginRight: 15
    },

    profileInfo: {
        flex: 1
    },

    name: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
        marginTop: 5
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10
    },

    firstButton: {
        marginRight: 10
    }
});

export default SubHeader;

