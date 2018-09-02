import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import "./Timetable.css";

const mapStateToProps = function(state) {
  return {
    tasks: state.tasks,
    taskDays: {
      byId: Object.assign({}, state.taskDays.byId),
      ids: state.taskDays.ids
    },
    taskTotalById: state.tasks.ids.reduce((result, taskId) => {
      result[taskId] = state.tasks.byId[taskId].taskDayIds.reduce(
        (total, taskDayId) => {
          total += state.taskDays.byId[taskDayId].workload;
          return total;
        },
        0
      );

      return result;
    }, {}),
    totalOverall: state.taskDays.ids.reduce((total, taskDayId) => {
      total += state.taskDays.byId[taskDayId].workload;
      return total;
    }, 0),
    calendarDays: state.taskDays.ids.reduce(
      (result, taskDayId) => {
        let taskDay = state.taskDays.byId[taskDayId];
        if (!result.byDate[taskDay.date]) {
          result.byDate[taskDay.date] = {
            date: taskDay.date,
            total: 0
          };
          result.dates.push(taskDay.date);
        }
        result.byDate[taskDay.date].total += taskDay.workload;
        return result;
      },
      {
        byDate: {},
        dates: []
      }
    )
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      editDay: actions.editDay
    },
    dispatch
  );
};

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.onCellChanged = this.onCellChanged.bind(this);
  }
  onCellChanged(event) {
    let taskDayId = event.target.dataset.taskdayid;
    let workload = parseFloat(event.target.value) || 0;
    let payload = {
      workload,
      taskDayId
    };
    this.props.editDay(payload);
  }
  render() {
    return (
      <div className="grid">
        <div className="grid__row grid__row--header">
          <div className="grid__cell grid__cell--task-name" />
          {this.props.calendarDays.dates.map(cdDate => (
            <div
              className="grid__cell grid__cell--time"
              key={this.props.calendarDays.byDate[cdDate].date}
            >
              <div>{this.props.calendarDays.byDate[cdDate].date}</div>
              <div>{this.props.calendarDays.byDate[cdDate].total}</div>
            </div>
          ))}
          <div className="grid__cell grid__cell--task-total">
            {this.props.totalOverall}
          </div>
        </div>
        {this.props.tasks.ids.map(taskId => (
          <div className="grid__row" key={taskId}>
            <div className="grid__cell grid__cell--task-name">
              {this.props.tasks.byId[taskId].name}
            </div>
            {this.props.tasks.byId[taskId].taskDayIds.map(taskDayId => (
              <div className="grid__cell grid__cell--time" key={taskDayId}>
                <input
                  value={this.props.taskDays.byId[taskDayId].workload}
                  data-taskdayid={taskDayId}
                  onChange={this.onCellChanged}
                />
              </div>
            ))}
            <div className="grid__cell grid__cell--task-total">
              {this.props.taskTotalById[taskId]}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timetable);
