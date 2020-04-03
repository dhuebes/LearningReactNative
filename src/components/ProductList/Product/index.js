import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native' 
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Product = ({ product/*: { image, title, description, price }*/, navigation, favBook}) => (
    
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('Detalhe', {product: product, favBook: favBook, navigation: navigation})}>
        <View style={styles.container} >
            <View style={styles.imageContainer}>
            <Image source={{ uri : product.thumbnail }} style={styles.image}/>
            </View>

            <View style={styles.infoContainer}>
                <Text>{favBook}</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.autor}>{product.authors}</Text>
                <Text style={styles.pageNumber}>{product.pageCount}</Text>

            </View>
        </View>

    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 3,
        marginBottom: 15,
        shadowColor: '#C0C0C0',
        shadowOpacity: 0.1,
        shadowOffset: { x: 0, y: 0 },
        width: (width - 45) / 2,
    },

    image: {
        width: '100%',
        height: 100,
        resizeMode: "contain"
    },

    title: {
        textAlign: "center",
        fontWeight: 'bold',
        color: '#111',
    },

    autor: {
        textAlign: "center",
        color: '#333',
        fontSize: 11
    },

    pageNumber: {
        textAlign: "center",
        color: '#C0C0C0',
        fontSize: 14,
        marginTop: 5        
    },

    infoContainer: {
        borderTopWidth: 1,
        borderColor: '#eee',
        padding: 15
    },

    imageContainer: {
        padding: 15
    }
});

export default Product;