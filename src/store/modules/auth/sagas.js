import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import * as RootNavigation from '~/services/RootNavigation';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `delivermans/${id}`);

    const deliveryman = response.data;

    yield put(signInSuccess(deliveryman));
    RootNavigation.navigate('Dashboard');
  } catch (error) {
    yield put(signInFailure());
    Alert.alert('Falha na autenticação', 'verifique seus dados');
  }
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
