import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPremierLeagueTeam,loadfixturesMatchDay } from '../action/premierleagueAction';
import premierleagueComponent from '../component/premierleagueComponent';
import { allTeamSelector,getfixturesMatchDaySelector } from '../selector/premierleagueSelector';

const mapStateToProps = (state) => {
  // return {
  //   leagueteam: allTeamSelector(state),
  //   fixturesMatchDay: getfixturesMatchDaySelector(state)
  // }
  return {
    currentMatchday: state.premierleagueReducer.currentMatchday,
    //leagueteam: allTeamSelector(state.premierleagueReducer.allteams),
    fixturesMatchDay: getfixturesMatchDaySelector(state.premierleagueReducer.fixtures),
    //teambyId: []
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    dispatch,
    loadPremierLeagueTeam,
    loadfixturesMatchDay,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(premierleagueComponent);

//export default connect(mapStateToProps, mapDispatchToProps)(rnnyComponent);
