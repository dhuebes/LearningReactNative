import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useRoute} from '@react-navigation/native';
import  Button  from '../Button/index';
import api from '../../services/api';

//export default class BookOptions extends Component {
export default function BookOptions() {
    const route = useRoute();
    const [selectedButton, setSelectedButton] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    async function clickButton(status) {
        setErrorMessage(null);
        let selectedButtonAux = selectedButton;
        setSelectedButton(status);

        try {
            const response = await api.post('https://jni93up6uf.execute-api.us-east-1.amazonaws.com/default/addFavBook', {
                userId: '0',
                id: route.params.product.id,
                status: status
            });
            
            //const nav = this.props.route.params.navigation;
            //nav.navigate('Meus Livros');
            //alert(JSON.stringify(response));
            //this.setState({ products: response.data.books });
        } catch (response) {
            //alert(JSON.stringify(response.message));
            setSelectedButton(selectedButtonAux);
            setErrorMessage('Não foi possível gravar, tente novamente.\nErro: ' + response.originalError.message);
            console.log(response.message);
            //this.setState({  });
        }        
    }

    function setStatus() {
        //console.log(route.params.product);
        setSelectedButton(route.params.product.status);
    }

    useEffect(() => {
        setStatus();
        //const favBook = this.props.route?.params?.favBook;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.button} 
                    type={selectedButton == 0 ? "" : "outline"}
                    onPress={() => clickButton(0)}>Vou ler</Button>   
                <Button 
                    style={styles.button} 
                    type={selectedButton == 1 ? "" : "outline"}
                    onPress={() => clickButton(1)}>Estou lendo</Button>   
                <Button 
                    style={[styles.firstButton, styles.button]} 
                    type={selectedButton == 2 ? "" : "outline"}
                    onPress={() => clickButton(2)}>Já li</Button>          
            </View>

            { errorMessage && 
                <Text style={styles.error}>{errorMessage}</Text>
            }
        </View>
    )    
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: "row",
        justifyContent: "space-between"
    },

    button: {
        width: '30%'
    }, 

    firstButton: {
        marginRight: 10
    },

    error: {
        padding: 15,
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: '#e37f7f',
        textAlign: "center",
        borderRadius: 30,
    },
})