import {FontIcons} from '../../assets/icons';
import * as Screens from '../../screens/index';
import rnnyContainer from '../../rnny/container/rnnyContainer';
import PremierleagueContainer from '../../football/container/premierleagueContainer';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'LoginMenu',
    title: 'Auth',
    icon: FontIcons.login,
    screen: Screens.LoginMenu,
    children: [
      {
        id: 'Login1',
        title: 'Login V1',
        screen: Screens.LoginV1,
        children: []
      },
      {
        id: 'Login2',
        title: 'Login V2',
        screen: Screens.LoginV2,
        children: []
      },
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
      {
        id: 'password',
        title: 'Password Recovery',
        screen: Screens.PasswordRecovery,
        children: []
      }
    ]
  },
  {
    id: 'RNNY',
    title: 'New York Times',
    icon: FontIcons.article,
    screen: rnnyContainer,
    children: []
  },
  {
    id: 'PremierLeague2017',
    title: 'PremierLeague 2017',
    icon: FontIcons.other,
    screen: PremierleagueContainer,
    //screenProps: '4',//,this.state.premierleagueReducer.currentMatchday,
    children: []
  }
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'RNNYHome',//'GridV2',
  title: 'Start',
  screen: rnnyContainer,//PremierleagueContainer,//rnnyContainer,//Screens.GridV2,
  children: []
},);

export const MenuRoutes = menuRoutes;
