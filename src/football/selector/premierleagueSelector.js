import { createSelector } from 'reselect';
import { reshapePremierLeagueData,reshapefixturesMatchDayData } from '../../utils/dataTransformations';

//const newsSelector = state => state.premierleagueReducer;
console.log('state.premierleagueReducer');
//console.log(state);
const fixturesMatchDaySelector = fixtures => fixtures;//state.premierleagueReducer.fixtures;

// const reshapePremierLeagueSelector = createSelector(
//   [newsSelector],
//   reshapePremierLeagueData
// );
//
// export const allTeamSelector = createSelector(
//   [reshapePremierLeagueSelector],
//   premierleagueItems => premierleagueItems
// );

const reshapefixturesMatchDaySelector = createSelector(
  [fixturesMatchDaySelector],
  reshapefixturesMatchDayData
);

export const getfixturesMatchDaySelector = createSelector(
  [reshapefixturesMatchDaySelector],
  fixturesMatchDay => fixturesMatchDay
);
