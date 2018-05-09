import { combineReducers } from 'redux';

function test(state = {name: 'aaa'}, action){
  return state;
}

const app = combineReducers({
  test,
})
export default app