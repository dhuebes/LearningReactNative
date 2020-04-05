import React, { Component, useEffect } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import SubHeader from '../SubHeader';
import BookOptions from '../BookOptions';
import api from '../../services/api';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
    }

    addClickButton = async () => {
        try {
            const response = await api.post('https://jni93up6uf.execute-api.us-east-1.amazonaws.com/default/addFavBook', {
                userId: '0',
                id: this.props.route.params.product.id,
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
                userId: '0',
                id: this.props.route.params.product.id,
            });
            
            //alert(JSON.stringify(response));
            //this.setState({ products: response.data.books });
        } catch (response) {
            //alert(JSON.stringify(response.message));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.message });
        }        
    }

    observer = ({ value, didUpdate }) => {
        useEffect(() => {
          console.log('aaa');
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
                
                { favBook && 
                    <BookOptions product={product}></BookOptions>
                }
                
                <View style={styles.resumeContainer}> 
                    <Text style={styles.title}>Sinopse</Text>

                    <ScrollView>
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
        //flexDirection: "row",
        alignContent: "center"
    },
    
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        width: '100%',
        marginBottom: 20,
        textAlign: 'center',     
    },

    resume: {
        fontSize: 14,
        textAlign: 'center',     
    }
});
