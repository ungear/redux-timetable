import { combineReducers } from 'redux';
import * as actions from './actions';
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
const initialTotalState = {
  days: {
    data: { 1: 10, 2: 6},
    ids: [1,2],
  },
  tasks: {},
  overall:0
}
function totalReducer(state = initialTotalState, action){
  switch (action.type){
    default: 
      return state
  }
}

const initialTasksState = {
  data: { 
    1: { 
      name: "task number 1", 
      days:{
        data: {1: 3, 2: 5},
        ids: [1, 2]
      }
    },
    2: { 
      name: "task number 2", 
      days:{
        data: {1: 7, 2: 12},
        ids: [1, 2]
      }
    }},
  ids: [1,2]
}
function tasksReducer(state = initialTasksState, action){
  switch (action.type){
    case actions.day_edit:
      return {
        ...state,
        data: {
          ...state.data,
          [action.changes.taskId]: {
            ...state.data[action.changes.taskId],
            days: {
              ...state.data[action.changes.taskId].days,
              data:{
                ...state.data[action.changes.taskId].days.data,
                [action.changes.dayId]: action.changes.value
              }
            }
          }
        }
      }
    default: 
      return state
  }
}
const app = combineReducers({
  total: totalReducer,
  tasks: tasksReducer,
})
export default app