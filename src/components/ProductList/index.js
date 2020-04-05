import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Product from './Product/index'
import api from '../../services/api';
import Header from '../Header';
import Button from '../Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

export default class ProductList extends Component {
    state = {
        products : [],
        searchTerm: 'Sonho Grande',
        errorMessage : null,
        infoMessage : null,
        findNewBook : false
    };

    constructor(props) {
        super(props);

        //console.log(this.props.route?.params?.findNewBook);
        if (!this.props.route?.params?.findNewBook) {
            this.loadFavBooks();
        }
    }

    loadFavBooks = async () => {
        try {
            const response = await api.get('https://e3wvo864a2.execute-api.us-east-1.amazonaws.com/default/getFavBooks');
        
            //alert(JSON.stringify(response));
            //this.setState({ products: [] });
            if (response.data.books.length == 0) {
                this.setState({ infoMessage: 'Nenhum livro adicionado.' });
            } else {
                console.log(response.data.books);
                //if (this.state.products.length != response.data.books.length) {
                this.setState({ products: response.data.books });
            }
        } catch (response) {
            //alert(JSON.stringify(response.originalError.message));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.originalError.message });
        }
    }

    searchClick = async () => {
        this.setState({ products: [] });
        this.setState({ errorMessage: undefined });
        try {
            const response = await api.post('https://wtvlui0j8i.execute-api.us-east-1.amazonaws.com/default/searchBooks', {
                term: this.state.searchTerm                
            });
        
            //alert(JSON.stringify(response));
            //alert(JSON.stringify(response.config.data));
            //alert(response.data);
            if (response.data.books == 0) {
                this.setState({ infoMessage: 'Nenhum livro encontrado.' });
                this.setState({products: []});
            } else {
                this.setState({products: response.data.books});
                this.setState({ infoMessage: null });
                this.refs.textInput.blur();
            }
        } catch (response) {
            //alert(JSON.stringify(response.originalError.message));
            this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.originalError.message });
        }
    }

    componentDidMount() {
        //console.log('componentDidMount');
        this._unsubscribe = this.props.navigation.addListener('focus', () => {            
            if (!this.props.route?.params?.findNewBook) {
                this.loadFavBooks();
            }
        });
          
    }
    componentWillUnmount() {
        //console.log('componentWillUnmount');
        //console.log(this.props.route?.params?.findNewBook);
        if (!this.props.route?.params?.findNewBook) {
            this.loadFavBooks();
        }
    }

    //  <Header title="Buscar livro" />
    render() {
        return (
            <ScrollView>
                <View style={styles.global}>
                    { this.props.route?.params?.findNewBook && 
                        <View style={ styles.containerSeach }>
                            <TextInput 
                                ref='textInput' 
                                style={styles.searchText} 
                                value={this.searchTerm}
                                onChangeText={term => this.setState({searchTerm: term})}
                                placeholder={'Informe o nome do livro'}
                            />
                            <Button 
                                style={styles.buttonSeach}
                                onPress={this.searchClick}>
                                <Icon name="search" size={20} style={styles.icon}/>
                            </Button>
                        </View>
                    }

                    <View style={styles.container}>
                        { this.state.products && this.state.products.map(product => 
                            <Product 
                                key={product.id} 
                                product={product} 
                                navigation={this.props.navigation} 
                                favBook={!this.props.route?.params?.findNewBook}
                            />
                        )}
                        { this.state.errorMessage && 
                            <Text style={styles.error}>{this.state.errorMessage}</Text>
                        }
                        { this.state.infoMessage && 
                            <Text style={styles.info}>{this.state.infoMessage}</Text>
                        }
                    </View>
                </View>
            </ScrollView>
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
    containerSeach: {
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    searchText: {
        flex: 1,
        borderBottomWidth: 1,
        fontSize: 20,
        paddingLeft: 10
    },
    buttonSeach: {
        height: 40,
        width: 40,
        marginBottom: 8
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
    info: {
        padding: 15,
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 30,
    }
});