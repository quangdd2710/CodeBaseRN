import { createDrawerNavigator, createAppContainer, createStackNavigator, StackNavigator } from 'react-navigation';
import { fromLeft, fromRight } from 'react-navigation-transitions';
import HomeScreen from '../Home';
import DetailScreen from '../Detail';
import SideMenu from '../SideMenu';

//use with case don't need slidemenu
// export default StackNavigator({
//   Home: { screen: HomeScreen },
//   Detail: { screen: DetailScreen }
// }, {
//       headerMode: 'none'
//   });

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-open',
      })
  },
    Detail: {
       screen: DetailScreen,
       navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed'
       })
      },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    // transitionConfig: () => fromRight(500)
    //edit transition config between screen
    transitionConfig: (toScreen, fromScreen) => {
      if(toScreen != null){
        const index = toScreen.navigation.state.index;
        const routes = toScreen.navigation.state.routes;
        if(index && routes && routes.length > index){
          if(routes[index].routeName === 'Detail'){
            return fromLeft(500);
          }
        }
      }
      return fromRight(500);
    }
  }
);


stackNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
  };
};
const MyDrawerNavigator = createDrawerNavigator(
  {
    stackNavigator
  }, {
    navigationOptions: { 
      gesturesEnabled: true ,
      drawerLockMode: 'locked-open'
    },
    contentComponent: SideMenu,
    drawerBackgroundColor: 'white',
    drawerWidth: 300
  }
);

export default MyApp = createAppContainer(MyDrawerNavigator);