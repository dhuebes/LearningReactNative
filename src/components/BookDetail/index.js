import React, { Component, useEffect } from 'react'
import { View, StyleSheet, Text, AsyncStorage } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import SubHeader from '../SubHeader';
import BookOptions from '../BookOptions';
import api from '../../services/api';

export default class BookDetail extends Component {
    state = {
        errorMessage : null,
        infoMessage : null,
        userId: null
    };

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

	_bootstrapAsync = async () => {
		try {
            let userId = await AsyncStorage.getItem('@socialbook:userData:userId');
            this.state.userId = userId;
		} catch (error) {
			console.log('Error getting user:',error);
		}
	}

    addClickButton = async () => {
        try {
            const response = await api.post('https://jni93up6uf.execute-api.us-east-1.amazonaws.com/default/addFavBook', {
                userId: this.state.userId,
                id: this.props.route.params.product.id,
                status: 0,
            });
            
            const nav = this.props.route.params.navigation;
            nav.navigate('Meus Livros');
            //alert(JSON.stringify(response));
            //this.setState({ products: response.data.books });
        } catch (response) {
            //alert(JSON.stringify(response.message));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.message });
        }        
    }
    
    removeClickButton = async () => {
        try {
            const response = await api.delete('https://b2e4mzteu3.execute-api.us-east-1.amazonaws.com/default/removeFavBook', {
                userId: this.state.userId,
                id: this.props.route.params.product.id,
            });
            
            this.props.route.params.navigation.navigate('Meus Livros');
            //alert(JSON.stringify(response));
            //this.setState({ products: response.data.books });
        } catch (response) {
            //alert(JSON.stringify(response));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.originalError.message });
        }        
    }

    observer = ({ value, didUpdate }) => {
        useEffect(() => {
          //console.log('aaa');
        }, [])
        return null // component does not render anything
    }

    render() {
        const product = this.props.route.params.product;
        const favBook = this.props.route?.params?.favBook;
        const labelButton = favBook ? 'Remover' : 'Adicionar';
        return (
            <View>
                <SubHeader image={product.thumbnail} title={product.title} 
                           autor={product.authors} button1={labelButton} button2=""
                           button1Click={favBook ? this.removeClickButton : this.addClickButton} />
                
                { this.state.errorMessage && 
                    <Text style={styles.error}>{this.state.errorMessage}</Text>    
                }

                { favBook && 
                    <BookOptions product={product}></BookOptions>
                }
                
                <View style={[styles.resumeContainer, favBook ? { marginBottom: 240 } : { marginBottom: 145 }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Sinopse</Text>                
                        <View>
                            <Text style={styles.resume}>{product.description}</Text>
                        </View>                
                    </ScrollView>
                </View>
            </View>
        )    
    }    
       
}

const styles = StyleSheet.create({
    resumeContainer: {
        padding: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: "row",
        alignContent: "center",
        paddingBottom: 100,
    },
    
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        width: '100%',
        marginBottom: 20,
        textAlign: 'center',     
    },

    resume: {
        fontSize: 16,
        textAlign: 'justify',
    },

    error: {
        padding: 10,
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: '#e37f7f',
        textAlign: "center"
    },
});
