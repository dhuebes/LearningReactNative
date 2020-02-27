import { React, Component } from 'react';
import { View } from 'react-native';

export default class Home extends Component {

    static navigationOptions = {
        drawerLabel: "Home",

        drawerIcon: ({focused, tintColor}) => (
            <Image
                style={styles.logo}
                style={{width: 40, height: 40}}
                source={require('../assets/settings.png')}
            />    
        )
    }

    render() {
        return (
            <View style="styles.container">

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo {

    }
  });