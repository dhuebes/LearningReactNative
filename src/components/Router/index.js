import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BookDetail from '../BookDetail';
import ProductList from '../ProductList';


const MainNav = createStackNavigator (
    {
        ProductList: {
            screen: ProductList,
            navigationOptions: {
                header: 'Buscar Livro'
            }
        },
        AboutBook: {
            screen: BookDetail,
            navigationOptions: {
                header: 'Sobre o livro'
            }
        }
    }
)

export default createAppContainer(MainNav);