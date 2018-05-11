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
    byDate: { "2018-01-01": 0, "2018-01-02": 0, "2018-01-03": 0},
    dates: ["2018-01-01","2018-01-02", "2018-01-03"],
  },
  tasks: {},
  overall:0
}
function totalReducer(state = initialTotalState, action){
  switch (action.type){
    case actions.total_initialize:
      let byDate = action.days.ids.reduce((res, taskDayId) => {
        let day = action.days.byId[taskDayId];
        res[day.date] = res[day.date] || 0;
        res[day.date] += day.workload;
        return res;
      }, {})
      return {
        ...state,
        days: {
          ...state.days,
          byDate
        }
      };
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
const initialTaskDayIdsState = [1,2,3,11,12,13]
function taskDayIdsReducer(state = initialTaskDayIdsState, action){
  switch (action.type){
    default: 
      return state
  }
}

const initialTaskDaysByIdState = {
  1: {
    date: '2018-01-01',
    workload: 11
  },
  2: {
    date: '2018-01-02',
    workload: 5
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


const app = combineReducers({
  total: totalReducer,
  tasks: tasksReducer,
  taskDays: combineReducers({
    ids: taskDayIdsReducer,
    byId: taskDaysByIdReducer,
  }),
})
export default app