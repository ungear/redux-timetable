import { combineReducers } from 'redux';

function test(state = {name: 'aaa'}, action){
  return state;
}
/*
  totals: {
    days:{
      data: {dayId1: 2, dayId2: 4},
      ids: [dayId1, dayId2]
    },
    tasks: {
      data: { taskId1: {}, taskId2: {}}
      ids: [taskId1, taskId2]
    },
    overall: 999
  },
  tasks:{
    data:{
      1: {
        name: "task name",
        days:{
          data: {dayId1: 2, dayId2: 4},
          ids: [dayId1, dayId2]
        }
      },
      2: {}
    }
    ids: [1,2 ...]
  }



*/
const app = combineReducers({
  test,
})
export default app