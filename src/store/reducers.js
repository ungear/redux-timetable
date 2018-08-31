import { combineReducers } from 'redux';
import * as actions from './actions';
/*
  tasks:{
    byId:{
      1: {
        name: "task name",
        taskDayIds:[1,2,3]
      },
      2: {}
    }
    ids: [1,2 ...]
  },
  taskDays:{
    byId:{
      1: {
        calendarDayId: 1
        workload: 2
      }
    }
    ids:[1,2,3]
  },
  calendarDays: {
    byId:{
      1: '2018-01-01',
      2: '2018-01-02'
    }
    ids:[1,2,3]
  }


*/
const initialTasksState = {
  byId: { 
    1: { 
      name: "task number 1", 
      taskDayIds:[1,2,3]
    },
    2: { 
      name: "task number 2", 
      taskDayIds:[11,12,13]
    }},
  ids: [1,2]
}
function tasksReducer(state = initialTasksState, action){
  switch (action.type){
    default: 
      return state
  }
}
const initialTaskDayIdsState = [1,2,3,11,12,13]
function taskDayIdsReducer(state = initialTaskDayIdsState, action){
  switch (action.type){
    default: 
      return state
  }
}

const initialTaskDaysByIdState = {
  1: {
    id: 1,
    calendarDayId: 1,
    workload: 11
  },
  2: {
    id: 2,
    calendarDayId: 2,
    workload: 5
  },
  3: {
    id: 3,
    calendarDayId: 3,
    workload: 3
  },
  11: {
    id: 11,
    calendarDayId: 2,
    workload: 3
  },
  12: {
    id: 12,
    calendarDayId: 3,
    workload: 2
  },
  13: {
    id: 13,
    calendarDayId: 4,
    workload: 1
  },
}
function taskDaysByIdReducer(state = initialTaskDaysByIdState, action){
  switch (action.type){
    case actions.day_edit:
      return {
        ...state,
        [action.changes.taskDayId]:{
          ...state[action.changes.taskDayId],
          workload: action.changes.workload
        }
      }
    default: 
      return state
  }
}

const initialCalendarDaysState =    {
  byId:{
    1: '2018-01-01',
    2: '2018-01-02',
    3: '2018-01-03',
  },
  ids: [1,2,3],
} 
function calendarDaysReducer(state = initialCalendarDaysState, action){
  return state
}


const app = combineReducers({
  tasks: tasksReducer,
  taskDays: combineReducers({
    ids: taskDayIdsReducer,
    byId: taskDaysByIdReducer,
  }),
  calendarDays: calendarDaysReducer,
})
export default app