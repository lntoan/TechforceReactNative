/**
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './createStore';
//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AppWithNavigationState from './containers/TechforceNavContainer';

const store = createStore();
console.ignoredYellowBox = ['Remote debugger'];

export default () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);
