import { combineReducers } from "redux";
import * as actions from "./actions";
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
        taskDayId: 1,
        date: '2018-01-01',
        workload: 2
      }
    }
    ids:[1,2,3]
  }


*/
const initialTasksState = {
  byId: {
    1: {
      name: "task number 1",
      taskDayIds: [1, 2, 3]
    },
    2: {
      name: "task number 2",
      taskDayIds: [11, 12, 13]
    }
  },
  ids: [1, 2]
};
function tasksReducer(state = initialTasksState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
const initialTaskDayIdsState = [1, 2, 3, 11, 12, 13];
function taskDayIdsReducer(state = initialTaskDayIdsState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialTaskDaysByIdState = {
  1: {
    taskDayId: 1,
    date: "2018-01-01",
    workload: 11
  },
  2: {
    taskDayId: 2,
    date: "2018-01-02",
    workload: 5
  },
  3: {
    taskDayId: 3,
    date: "2018-01-03",
    workload: 3
  },
  11: {
    taskDayId: 11,
    date: "2018-01-01",
    workload: 3
  },
  12: {
    taskDayId: 12,
    date: "2018-01-02",
    workload: 2
  },
  13: {
    taskDayId: 13,
    date: "2018-01-03",
    workload: 1
  }
};
function taskDaysByIdReducer(state = initialTaskDaysByIdState, action) {
  switch (action.type) {
    case actions.day_edit:
      return {
        ...state,
        [action.changes.taskDayId]: {
          ...state[action.changes.taskDayId],
          workload: action.changes.workload
        }
      };
    default:
      return state;
  }
}

const app = combineReducers({
  tasks: tasksReducer,
  taskDays: combineReducers({
    ids: taskDayIdsReducer,
    byId: taskDaysByIdReducer
  })
});
export default app;
