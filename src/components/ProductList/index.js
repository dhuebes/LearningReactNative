import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, FlatList, 
        ActivityIndicator, Dimensions, AsyncStorage, 
        TouchableOpacity } from 'react-native';       
import Product from './Product/index'
import api from '../../services/api';
import Button from '../Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';

export default class ProductList extends Component {
    state = {
        products : [],
        searchTerm: 'Sonho Grande',
        errorMessage : null,
        infoMessage : null,
        findNewBook : false,
        page : 0,
        loading: false,
        loadingInfinite: false,
        total: 1
    };
    _isMounted = false;

    constructor(props) {
        super(props);

        this._bootstrapAsync();
    }

	_bootstrapAsync = async () => {
		try {
            let userId = await AsyncStorage.getItem('@socialbook:userData:userId');
            this.state.userId = userId;
            //console.log(this.state);
            if (!this.props.route?.params?.findNewBook) {
                this.loadFavBooks();
            }
		} catch (error) {
			console.log('Error getting user:',error);
		}
	}

    loadFavBooks = async () => {
        //console.log(' aa : '+ this.state.userId);
        if (this.state.userId) {
            //console.log(' bb : '+ this.state.userId);
            try {
                //this.state.products = [];  
                //console.log(this.state.userId);
                this.setState({ loading: true });
                this.state.loading = true;            
                const response = await api.get(`https://e3wvo864a2.execute-api.us-east-1.amazonaws.com/default/getFavBooks`, {
                    getAllBooks: this.props.showAllBooks,
                    userId: this.state.userId
                });
            
                //alert(JSON.stringify(response));
                //this.setState({ products: [] });
                //console.log(response.data.books.length);
                if (response.data.books.length == 0) {
                    this.setState({ products: [] });
                    this.setState({ infoMessage: `Nenhum livro adicionado.\nClique em + para adicionar.` });
                } else {
                    //console.log(response.data.books);
                    //if (this.state.products.length != response.data.books.length) {
                    this.setState({ infoMessage: null });
                    this.setState({ errorMessage: null });
                    this.setState({ products: response.data.books });
                }
            } catch (response) {
                //alert(JSON.stringify(response.originalError.message));
                this.setState({ errorMessage: 'Não foi possível carregar.\n' + response.originalError.message });
            }
            this.setState({ loading: false });
        }   
    }

    searchClick = async () => {
        this.setState({ page: 1 });
        this.setState({ errorMessage: null });
        try {
            this.setState({ loading: true });
            this.setState({ products: [] });
            const response = await api.post('https://wtvlui0j8i.execute-api.us-east-1.amazonaws.com/default/searchBooks', {
                term: this.state.searchTerm,
                page: 0
            });
        
            //alert(JSON.stringify(response));
            //alert(JSON.stringify(response.config.data));
            //console.log('searchClick');
            this.setState({ total: response.data.total });
            if (response.data.books.length == 0) {
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
        this.setState({ loadingInfinite: false });
        this.setState({ loading: false });
    }

    loadMore = async () => {
        //console.log('loadMore');
        if (this.props.route?.params?.findNewBook) {
            //alert(this.state.loading + ' - ' + this.state.total + ' - ' + this.state.products.length);
            if (this.state.loading) { return; }
            if (this.state.total > 0 && this.state.products.length == this.state.total) {
                return 
            }

            this.setState({ loadingInfinite: true });
            this.setState({ loading: true });
            const response = await api.post('https://wtvlui0j8i.execute-api.us-east-1.amazonaws.com/default/searchBooks', {
                term: this.state.searchTerm,
                page: this.state.page             
            });

            //alert(response.data.books);

            this.state.products = this.state.products.concat(response.data.books);
            this.setState({ page: this.state.page+1 });
            this.setState({ loadingInfinite: false });
            this.setState({ loading: false });
            //console.log(this.state.page);
        }   
    }

    componentDidMount() {
        //console.log(this._isMounted);
        this._isMounted = true;

        //console.log('componentDidMount');
        this._unsubscribe = this.props.navigation.addListener('focus', () => {      
            //console.log('focused');   
            if (this._isMounted) {
                if (!this.props.route?.params?.findNewBook) {
                    this.loadFavBooks();
                }    
            }
        });


          
    }
    componentWillUnmount() {
        this._isMounted = false;
        //console.log('componentWillUnmount');
    }

    //  <Header title="Buscar livro" />
    render() {
        return (
            <View style={styles.global}>
                <View>
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

                    
                    <View style={styles.booksListContainer}>
                        <FlatList                      
                            style={this.props.route?.params?.findNewBook ? {marginBottom: 115} : {marginBottom: 0}}
                            data={this.state.products}  
                            keyExtractor={product => String(product.id)}
                            numColumns={2}
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={0.2}
                            bounces={false}
                            renderItem={({item: product}) => (
                                
                                <View style={styles.container}>
                                    
                                    <Product 
                                        key={product.id} 
                                        product={product} 
                                        navigation={this.props.navigation} 
                                        favBook={!this.props.route?.params?.findNewBook}
                                    />
                                    
                                </View>
                            )}
                        />
                    </View>    
                    


                    { this.state.errorMessage && 
                        <View style={styles.errorContainer}>
                            <Text style={styles.error}>{this.state.errorMessage}</Text>

                            <TouchableOpacity 
                                onPress={this.loadFavBooks}
                                style={styles.refreshContainer}>
                                <Feather name="refresh-cw" size={20}/>
                                <Text style={{ fontSize: 20, marginLeft: 6 }}>Tentar novamente</Text>
                            </TouchableOpacity>

                        </View>    
                    }
                    { this.state.infoMessage &&
                        <Text style={styles.info}>{this.state.infoMessage}</Text>
                    }

                    { this.state.infoMessage && !this.props.route?.params?.findNewBook &&
                        <View style={styles.infoContainer }>
                            <Text style={{fontSize: 16}}>Clique em </Text>
                            <Feather style={{fontSize: 18}} name="book-open"/>
                            <Text style={{fontSize: 16}}> para mostrar os livros já lidos</Text>
                        </View>    
                    }
                </View>    
                

                { this.state.loading && /*this.state.loadingInfinite && */
                    <View style={styles.containerSpinner}>     
                    </View>    
                }
                
                { this.state.loading && 
                    <ActivityIndicator 
                        style={[styles.spinner]}
                        size="large" 
                        color="#000000" 
                    />       
                }
            </View>
        )
    }
}

/*

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
                    */

const styles = StyleSheet.create({
    global: {
        //flexDirection: 
        //alignSelf
        //flexWrap: "wrap"
        //alignContent
        height: Dimensions.get("window").height ,
        backgroundColor: '#F8F8FA',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    container: {
        marginLeft: 10,
        marginRight: 10
        //flexDirection: "row",
        //flexWrap: "wrap",
        //justifyContent: "space-between"
    },
    containerSeach: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    booksListContainer: {
        marginTop: 15,
        paddingBottom: 170
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
    errorContainer: {
        padding: 15,
        width: '100%',
        alignItems: "center",
        backgroundColor: '#e37f7f',
        justifyContent: "center"

    },
    refreshContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    infoContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        padding: 15,
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 30,
        fontSize: 18
    },

    containerSpinner: {
        backgroundColor: '#000000',
        opacity: 0.2,
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
    },
    
    spinner: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        opacity: 1 ,
        marginBottom: 170
        //backgroundColor: '#0000FF'
    }
});