import FOOTBALL_API_KEY from '../../config/football/premierleagueApiKey';

const getfixturesMatchDay  = 'http://api.football-data.org/v1/competitions/445/fixtures?matchday='; // 4 is matchDay should save on server and return after login or initialize app
const getPremierLeagueTeams = 'http://api.football-data.org/v1/competitions/445/teams'; //445 is premier league
const getPremierLeague = 'http://api.football-data.org/v1/competitions/445';

export const loadPremierLeagueTeam = () => {

  const req = fetch(getPremierLeagueTeams, {
          method: 'get',
          headers: {
            'X-Auth-Token': FOOTBALL_API_KEY
          }
      });
  return {
    type: 'LOAD_PremierLeagueTeam',
    payload: req.then(response => response.json())
  };

};

export const loadPremierLeague = () => {

  const req = fetch(getPremierLeague, {
          method: 'get',
          headers: {
            'X-Auth-Token': FOOTBALL_API_KEY
          }
      });
  return {
    type: 'LOAD_PremierLeagueTeam',
    payload: req.then(response => response.json())
  };

};

export const setcurrentMatchday = (currentMatchday) => ({
    type: 'SET_Current_Match',
    currentMatchday
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    loading
});

export const setFixturesMatchDay = (fixtures) => ({
    type: 'SET_FixturesMatchDay',
    fixtures
});

export const loadfixturesMatchDay = () => {
    return function (dispatch, getState) {

      fetch(getPremierLeague, {
              method: 'get',
              headers: {
                'X-Auth-Token': FOOTBALL_API_KEY
              }
          }
        ).then((response) => response.json())
        .then((json) => {
          dispatch(setcurrentMatchday(json.currentMatchday));
          loadfixturesMatchDayData(dispatch,getfixturesMatchDay+json.currentMatchday);
        })
        .catch((error) =>
          {
            console.log(error.message);
          });
    }
}

export const loadfixturesMatchDayData = (dispatch,url) => {
  dispatch(setLoading(false));
  fetch((url), {
          method: 'get',
          headers: {
            'X-Auth-Token': FOOTBALL_API_KEY
          }
      })
  .then((response) => response.json())
  .then((json) => {
    dispatch(setLoading(true));
    dispatch(setFixturesMatchDay(json.fixtures))
  })
  .catch(() => {
    reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}
