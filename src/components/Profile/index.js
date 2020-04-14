import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from '../../amplify-config';
Amplify.configure(amplifyConfig);

export default function Profile ( { route }) {
    const [userData, setUserData] = useState(null);

    async function logout() {
       
        //route.params?.handleClearSession();
        Auth.signOut({ global: true })
            .then((data) => route.params?.handleClearSession())
            .catch(err => {
                console.log('ERROR: ' + JSON.stringify(err));
                if (err.code == "NotAuthorizedException") {
                    route.params?.handleClearSession();
                }
            });
            
    }

    async function loadUserData() {
        //console.log(route.params.product);
        let userDataAux = await AsyncStorage.getItem('@socialbook:userData');
        let userId = await AsyncStorage.getItem('@socialbook:userData:userId');
        await setUserData(JSON.parse(userDataAux));
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image 
                        style={styles.avatar}
                        source={ require('../../../assets/default-profile.jpg') }
                    />
                </View>

                <View style={styles.containerInfo}>
                    <Text> { userData?.email } </Text>
                </View>
            </View>

            
            <View style={styles.containerButtons}>
                <TouchableOpacity >
                    <Feather.Button
                        onPress={logout} 
                        style={styles.logoutButton} 
                        name="log-out" 
                        backgroundColor="red"
                        borderRadius={34}
                        fontSize={38}>
                        <Text style={ { color: 'white', fontWeight: 'bold', fontSize: 16 }}> Sair </Text>
                    </Feather.Button>
                </TouchableOpacity>
            </View>
        </View>
    )    
}

/*
// npm install --save react-native-fbsdk
<View style={styles.container}>
    <Text> FaceBook </Text> 
</View>
*/

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    containerImg: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginRight: 15
    },
    
    containerInfo: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30
    },

    containerButtons: {
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: "row",
        justifyContent: "center",
    },

    logoutButton: {     
        justifyContent: "center",
        backgroundColor: 'red',
        width: 120
    },    
});