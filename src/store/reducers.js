import { combineReducers } from 'redux';
import * as actions from './actions';
/*
  totals: {
    days:{
      byDate: {'2018-01-01': 2, '2018-01-02': 4},
      dates: ['2018-01-01', '2018-01-02']
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
        taskDayIds:[1,2,3]
      },
      2: {}
    }
    ids: [1,2 ...]
  }
  taskDays:{
    byId:{
      1: {
        date: '2018-01-01'
        workload: 2
      }
    }
    ids:[1,2,3]
  }


*/
const initialTotalState = {
  days: {
    byDate: { "2018-01-01": 10, "2018-01-02": 6, "2018-01-03": 3},
    dates: ["2018-01-01","2018-01-02", "2018-01-03"],
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
// const initialTaskDayIdsState = [1,2,3,11,12,13]
// function taskDaysReducer(state = initialTaskDayIdsState, action){
//   switch (action.type){
//     default: 
//       return state
//   }
// }

const initialTaskDaysState = {
  byId:{
    1: {
      date: '2018-01-01',
      workload: 1
    },
    2: {
      date: '2018-01-02',
      workload: 2
    },
    3: {
      date: '2018-01-03',
      workload: 3
    },
    11: {
      date: '2018-01-01',
      workload: 3
    },
    12: {
      date: '2018-01-02',
      workload: 2
    },
    13: {
      date: '2018-01-03',
      workload: 1
    },
  },
  ids:[1,2,3,11,12,13]
}
function taskDaysReducer(state = initialTaskDaysState, action){
  switch (action.type){
    case actions.day_edit:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.changes.taskDayId]:{
            ...state.byId[action.changes.taskDayId],
            workload: action.changes.workload
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
  taskDays: taskDaysReducer,
})
export default app