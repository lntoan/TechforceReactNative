const initialState = {
    currentMatchday: '',
    loaded: false,
    allteams: [],
    fixtures: [],
    teambyId: []
};

const premierleagueReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case 'LOAD_PremierLeagueTeam':
        return Object.assign({}, state, {
            allteams: action.teams || []
        });
        break;
      case 'SET_FixturesMatchDay':
        return Object.assign({}, state, {
            fixtures: action.fixtures || []
        });
        break;
      case 'LOAD_TeamByID':
        return Object.assign({}, state, {
            teambyId: action.result || []
        });
        break;
      case 'SET_Current_Match':
        return Object.assign({}, state, {
            currentMatchday: action.currentMatchday
        });
        break;
      case 'SET_LOADING':
        return Object.assign({}, state, {
            loaded: action.loading
        });
        break;
      default:
        return state;
    }
}

export default premierleagueReducer;
