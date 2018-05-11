import { combineReducers } from 'redux';
import * as actions from './actions';
/*
  totals: {
    days:{
      byId: {dayId1: 2, dayId2: 4},
      ids: [dayId1, dayId2]
    },
    tasks: {
      byId: { taskId1: {}, taskId2: {}}
      ids: [taskId1, taskId2]
    },
    overall: 999
  },
  tasks:{
    byId:{
      1: {
        name: "task name",
        days:{
          byId: {dayId1: 2, dayId2: 4},
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
    byId: { 1: 10, 2: 6},
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
  byId: { 
    1: { 
      name: "task number 1", 
      days:{
        byId: {1: 3, 2: 5},
        ids: [1, 2]
      }
    },
    2: { 
      name: "task number 2", 
      days:{
        byId: {1: 7, 2: 12},
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
        byId: {
          ...state.byId,
          [action.changes.taskId]: {
            ...state.byId[action.changes.taskId],
            days: {
              ...state.byId[action.changes.taskId].days,
              byId:{
                ...state.byId[action.changes.taskId].days.byId,
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