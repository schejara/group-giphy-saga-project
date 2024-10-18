import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';


function* searchGiphy(action) {
    try {
      const giphyResponse = yield axios.get(`/api/giphy/search?q=${action.payload}`);
      yield put({ type: 'SET_GIPHY', payload: giphyResponse.data });
    } catch (err) {
      console.error('Error Searching Giphy', err);
    }
  }


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
    yield takeLatest('SEARCH_GIPHY', searchGiphy);
    yield takeLatest('POST_GIPHY', postGiphy);
  }

  function* getGiphy(){
    try{
      const giphyResponse = yield axios.get('/api/giphy/search')
      yield put({type: 'SET_GIPHY', payload: giphyResponse.data})
    } catch(err){
      console.error('Error Getting Giphy', err)
    }
  }

  function* postGiphy(action){  
    try {
     yield axios.post ('/api/favorites', action.payload)
     yield put ({type: 'POST_GIPHY_SUCCESS'})
    } catch(err) {
       console.error('Error Post', err)
    }
     
   }


  


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({giphyData}),
    applyMiddleware(sagaMiddleware, logger)
  );
export default store;

sagaMiddleware.run(rootSaga);