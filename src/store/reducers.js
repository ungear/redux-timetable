import { combineReducers } from 'redux';
import * as actions from './actions';
/*
  totals: {
    days:{
      byDate: {'2018-01-01': 2, '2018-01-02': 4},
      dates: ['2018-01-01', '2018-01-02']
    },
    tasks: {
      byId: { taskId1: 1, taskId2: 2}
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

const initialTotalDaysState = {
  byDate: { "2018-01-01": 0, "2018-01-02": 0, "2018-01-03": 0},
  dates: ["2018-01-01","2018-01-02", "2018-01-03"],
}
function totalDaysReducer(state = initialTotalDaysState, action){
  switch (action.type){
    case actions.total_initialize:
      let byDate = action.initialData.taskDays.ids.reduce((res, taskDayId) => {
        let day = action.initialData.taskDays.byId[taskDayId];
        res[day.date] = res[day.date] || 0;
        res[day.date] += day.workload;
        return res;
      }, {})
      return {
        ...state,
        byDate
      };
    case actions.day_edit:
      return {
        ...state,
        byDate:{
          ...state.byDate,
          [action.changes.date]: state.byDate[action.changes.date] + action.changes.delta
        }
      };
    default: 
      return state
  }
}

const initialTotalTasksState = {
  byId: {},
  ids: []
}
function totalTasksReducer(state = initialTotalTasksState, action){
  switch (action.type){
    case actions.total_initialize:
      let tasks = {};
      tasks.ids = [...action.initialData.tasks.ids];
      tasks.byId = tasks.ids.reduce((result, taskId) => {
        result[taskId] = 0;
        let taskDayIds = action.initialData.tasks.byId[taskId].taskDayIds;
        taskDayIds.forEach(tdId => result[taskId] += action.initialData.taskDays.byId[tdId].workload);
        return result;
      }, {})
      return tasks;
    case actions.day_edit:
      return {
        ...state,
        byId:{
          ...state.byId,
          [action.changes.taskId]: state.byId[action.changes.taskId] + action.changes.delta
        }
      };
    default: 
      return state
  }
}

const initialOverallTotalState = 0;
function overallTotalReducer(state = initialOverallTotalState, action){
  switch (action.type){
    case actions.total_initialize:
      return action.initialData.taskDays.ids.reduce((total, taskDayId) => 
        total + action.initialData.taskDays.byId[taskDayId].workload, 0)
    case actions.day_edit:
      return state + action.changes.delta;
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
  total: combineReducers({
    days: totalDaysReducer,
    tasks: totalTasksReducer,
    overall: overallTotalReducer,
  }),
  tasks: tasksReducer,
  taskDays: combineReducers({
    ids: taskDayIdsReducer,
    byId: taskDaysByIdReducer,
  }),
})
export default app