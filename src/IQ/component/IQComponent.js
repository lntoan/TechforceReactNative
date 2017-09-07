import React from 'react';
import { View, TouchableOpacity,ActivityIndicator,Platform,
         NetInfo,ViewPropTypes, ImageBackground
       } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';

export default class IQComponent extends React.Component {
  static navigationOptions = {
    title: 'IQ '.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.renderItem = this._renderItem.bind(this);
    this.state = {
      data: null,
      initialLoading: true,
      refreshing: false,
      connected: true,
    }
    this.refresh = this.refresh.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
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
        data: [],//nextProps.fixturesMatchDay,
        initialLoading: false
      });
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
  }

  refresh() {
    //   this.props.loadfixturesMatchDay();
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
