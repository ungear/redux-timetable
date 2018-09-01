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
    calendarDays: state.calendarDays,
    calendarDayTotalById: state.calendarDays.ids.reduce((totals, cdId) => {
      let calendarDayTotal = state.taskDays.ids
        .map(tdId => state.taskDays.byId[tdId])
        .filter(taskDay => taskDay.calendarDayId === cdId)
        .map(taskDay => taskDay.workload)
        .reduce((total, workload) => {
          total += workload;
          return total;
        }, 0);

      totals[cdId] = calendarDayTotal;
      return totals;
    }, {})
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
          {this.props.calendarDays.ids.map(cdId => (
            <div
              className="grid__cell grid__cell--time"
              key={this.props.calendarDays.byId[cdId]}
            >
              {this.props.calendarDays.byId[cdId]} -
              {this.props.calendarDayTotalById[cdId]}
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
              <input
                className="grid__cell grid__cell--time"
                key={taskDayId}
                value={this.props.taskDays.byId[taskDayId].workload}
                data-taskdayid={taskDayId}
                data-taskid={taskId}
                onChange={this.onCellChanged}
              />
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
