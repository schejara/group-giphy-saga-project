import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';

const giphyData = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIPHY':
          return action.payload;
        default:
          return state;
      }

}

function* rootSaga() {
    yield takeLatest('GET_GIPHY', getGiphy);
    
  }

  function* getGiphy(){
    try{
      const giphyResponse = yield axios.get('/api/giphy/search')
      yield put({type: 'SET_GIPHY', payload: giphyResponse.data})
    } catch(err){
      console.error('Error Getting Giphy', err)
    }
  }



  


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({giphyData}),
    applyMiddleware(sagaMiddleware, logger)
  );
export default store;

sagaMiddleware.run(rootSaga);