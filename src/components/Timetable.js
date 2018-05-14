import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions  from "../store/actions";
import "./Timetable.css";
const mapStateToProps = function(state){
  return {
    tasks: state.tasks,
    total: state.total,
    taskDays: {
      byId: Object.assign({}, state.taskDays.byId),
      ids: state.taskDays.ids,
    },
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    editDay: actions.editDay,
    initializeTotals: actions.initializeTotals,
  }, dispatch)
}


class Timetable extends Component {
  constructor(props){
    super(props)
    this.onCellChanged = this.onCellChanged.bind(this)
  }
  componentDidMount(){
    this.props.initializeTotals({taskDays: this.props.taskDays, tasks: this.props.tasks});
  }
  onCellChanged(event){
    let payload = {
      taskDayId: event.target.dataset.taskdayid,
      workload: event.target.value
    }
    this.props.editDay(payload);
  }
  render(){
    return (
      <div className="grid">
        <div className="grid__row grid__row--header">
          <div className="grid__cell grid__cell--task-name"></div>
          {this.props.total.days.dates.map(dayDate =>
            <div className="grid__cell grid__cell--time" key={dayDate}>{this.props.total.days.byDate[dayDate]}</div>
          )}
          <div className="grid__cell grid__cell--task-total" >Total</div>
        </div>
        {this.props.tasks.ids.map(taskId =>
          <div className="grid__row" key={taskId}>
            <div className="grid__cell grid__cell--task-name">{this.props.tasks.byId[taskId].name}</div>
            {this.props.tasks.byId[taskId].taskDayIds.map(taskDayId =>
              <input className="grid__cell grid__cell--time" key={taskDayId}
                value={this.props.taskDays.byId[taskDayId].workload} 
                data-taskdayid={taskDayId}
                onChange={this.onCellChanged} />
            )}
            <div className="grid__cell grid__cell--task-total">{this.props.total.tasks.byId[taskId]}</div>
          </div>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Timetable)