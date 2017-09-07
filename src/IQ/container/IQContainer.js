import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { loadPremierLeagueTeam,loadfixturesMatchDay } from '../action/premierleagueAction';
import IQComponent from '../component/IQComponent';
//import { allTeamSelector,getfixturesMatchDaySelector } from '../selector/premierleagueSelector';

const mapStateToProps = (state) => {
  return {
    currentMatchday: state.premierleagueReducer.currentMatchday,
    fixturesMatchDay: getfixturesMatchDaySelector(state.premierleagueReducer.fixtures),
    isLoaded: state.premierleagueReducer.loaded
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    dispatch,
    // loadPremierLeagueTeam,
    // loadfixturesMatchDay,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(premierleagueComponent);
