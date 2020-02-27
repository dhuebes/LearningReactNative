import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import  Button  from '../Button/index';


const SubHeader = () => (
    <View style={styles.container}>
        <Image 
            style={styles.avatar}
            source={{ uri: 'https://thumbs.dreamstime.com/z/do-retrato-masculino-do-avatar-do-%C3%ADcone-do-perfil-pessoa-ocasional-58249394.jpg '}}
        />

        <View style={styles.profileInfo}>
            <Text style={styles.name}>Daniel Huebes</Text>
            <Text style={styles.bio}>Analista de Sistema na Senior</Text>

            <View style={styles.buttonContainer}>
                <Button style={styles.firstButton}>Mensagem</Button>
                <Button type="outline">Seguir</Button>
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
        width: 68,
        height: 68,
        borderRadius: 34,
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

