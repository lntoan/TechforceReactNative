import React from 'react';
import { View, TouchableOpacity,RefreshControl,ActivityIndicator,Platform,
         NetInfo,Linking,ViewPropTypes, ImageBackground, Modal,WebView,FlatList
       } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import FitImage from 'react-native-fit-image';
import PropTypes from 'prop-types';
import {Avatar} from '../../components';
import {data} from '../../data';
let moment = require('moment');

export default class premierleagueComponent extends React.Component {
  static navigationOptions = {
    title: 'premier league 2017 '.toUpperCase() //+ this.props.currentMatchday
  };

  // static navigationOptions = ({ navigation, screenProps }) => {
  //   console.log('le ngoc toan');
  //   console.log(screenProps);
  // }

  constructor(props) {
    super(props);

    this.renderItem = this._renderItem.bind(this);
    this.state = {
      data: null,
      initialLoading: true,
      modalVisible: false,
      refreshing: false,
      connected: true,
      modalUrl: ''
    }
    this.refresh = this.refresh.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.getTimeOrResult = this.getTimeOrResult.bind(this);
  }

  handleConnectivityChange(isConnected) {
    this.setState({
      connected: isConnected
    });
    if (isConnected) {
      this.refresh();
    }
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded == true ){
      this.setState({
        data: nextProps.fixturesMatchDay,//nextProps.leagueteam, // rnnynews is properties defined in ACtion
        initialLoading: false
      });
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
  }

  refresh() {
    if (this.props.loadPremierLeagueTeam) {
      this.props.loadfixturesMatchDay();
    }
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  getTimeOrResult(info){
    if (info.item.status == "TIMED"){
      return (
        <View style={styles.logotimecontainer}>
          {Platform.OS === 'ios' ?
            <ImageBackground style={[styles.image]} source={{uri: info.item.homeTeamLogo}}/>:
            <ImageBackground style={[styles.image]} source={info.item.homeTeamLogo}/>
          }
          <View style={styles.timedate}>
            <RkText rkType='header6'>{info.item.time}</RkText>
            <RkText rkType='header6'>{info.item.date}</RkText>
          </View>
          {Platform.OS === 'ios' ?
            <ImageBackground style={[styles.image]} source={{uri: info.item.awayTeamLogo}}/>:
            <ImageBackground style={[styles.image]} source={info.item.awayTeamLogo}/>
          }
        </View>
      );
    }
    else {
      return (
        <View style={styles.logotimecontainer}>
          {Platform.OS === 'ios' ?
            <ImageBackground style={[styles.image]} source={{uri: info.item.homeTeamLogo}}/>:
            <ImageBackground style={[styles.image]} source={info.item.homeTeamLogo}/>
          }
          <RkText rkType='header6'>{`${info.item.goalsHomeTeam}`}</RkText>
          <RkText rkType='header6'>:</RkText>
          <RkText rkType='header6'>{`${info.item.goalsAwayTeam}`}</RkText>
          {Platform.OS === 'ios' ?
            <ImageBackground style={[styles.image]} source={{uri: info.item.awayTeamLogo}}/>:
            <ImageBackground style={[styles.image]} source={info.item.awayTeamLogo}/>
          }
        </View>
      );
    }
  }
  _renderItem(info) {

    const result = this.getTimeOrResult(info)
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}>
        {/* onPress={() => this.onModalOpen(info.item.id)}> */}
        <RkCard rkType='blog' style={styles.card}>
          <View rkCardFooter>
            <View style={styles.viewcontainer}>
              <View style={styles.hometeamcontainer}><RkText rkType='header6'>{info.item.homeTeamName}</RkText></View>
              {result}
              <View style={styles.awayteamcontainer}><RkText rkType='header6'>{info.item.awayTeamName}</RkText></View>
            </View>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {

    const { initialLoading, refreshing, data } = this.state;

    if (!this.state.connected) {
      return (
          <View style={[styles.loadingContainer]}>
            <RkText rkType='header6'> No Connection </RkText>
          </View>
      );
    }
    return (
      (initialLoading
        ? (

            <ActivityIndicator style={styles.activityIndicator} size="large"
              animating
              {...this.props}
            />

        ) : (
          <View style={styles.viewcontainer}>
            <FlatList
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshing}
              //     onRefresh={this.refresh}
              //   />
              // }
              enableEmptySections
              data={this.state.data}
              extraData={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              style={styles.container}/>
          </View>
        )
      )
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  viewcontainer:{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1
  },
  hometeamcontainer:{
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  awayteamcontainer:{
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  logotimecontainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  avatar: {
    marginRight: 17
  },
  image: {
    height: 35,
    width: 35,
    justifyContent: 'center'
  },
  timedate: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   modalContent: {
     flex: 1,
     justifyContent: 'center',
     paddingTop: 20,
     //backgroundColor: globalStyles.BG_COLOR
   },
   closeButton: {
     paddingVertical: 5,
     paddingHorizontal: 10,
     flexDirection: 'row'
   },
   modalButtons: {
     paddingVertical: 5,
     paddingHorizontal: 10,
     flexDirection: 'row',
     justifyContent: 'space-between'
   },
   loadingContainer: {
     alignItems: 'center',
     justifyContent: 'center'
   }
}));
