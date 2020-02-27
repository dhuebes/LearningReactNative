import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const Product = ({ product : { image, title, description, price } }) => (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
         <Image source={{ uri : image }} style={styles.image}/>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>{price}</Text>

        </View>
    </View>
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

    description: {
        textAlign: "center",
        color: '#333',
        fontSize: 11
    },

    price: {
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