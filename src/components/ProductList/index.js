import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Product from './Product/index'
import api from '../../services/api';
import Header from '../Header';

export default class ProductList extends Component {
    state = {
        products : [],
        errorMessage : null
    };

    loadProducts = async () => {
        try {
            const response = await api.get('https://9g8bm6r24g.execute-api.us-east-1.amazonaws.com/default/getBooks');
        
            this.setState({ products: response.data.books });
        } catch (response) {
            //alert(JSON.stringify(response.originalError.message));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.originalError.message });
        }
    }

    constructor(props) {
        super(props);

        this.loadProducts();
    }

    render() {
        return (
            <View style={styles.global}>
                <Header title="Produtos" />
                <View style={styles.container}>
                    { this.state.products && this.state.products.map(product => 
                        <Product key={product.id} product={product} />
                    )}
                    { this.state.errorMessage && 
                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    global: {
        //flexDirection: 
        //alignSelf
        //flexWrap: "wrap"
        //alignContent
        flex: 1,
        backgroundColor: '#F8F8FA',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    container: {
        padding: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    error: {
        padding: 15,
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: '#e37f7f',
        textAlign: "center",
        borderRadius: 30,

    }
});