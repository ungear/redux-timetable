import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions  from "../store/actions";
import "./Timetable.css";
const mapStateToProps = function(state){
  return {
    tasks: Object.assign({}, state.tasks),
    total: state.total,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    editDay: actions.editDay,
  }, dispatch)
}


class Timetable extends Component {
  constructor(props){
    super(props)
    this.onCellChanged = this.onCellChanged.bind(this)
  }
  componentDidMount(){
  }
  onCellChanged(event){
    let payload = {
      taskId: event.target.dataset.taskid,
      dayId: event.target.dataset.dayid,
      value: event.target.value
    }
    this.props.editDay(payload);
  }
  render(){
    return (
      <div className="grid">
        <div className="grid__row grid__row--header">
          <div className="grid__cell grid__cell--task-name"></div>
          {this.props.total.days.ids.map(dayId =>
            <div className="grid__cell grid__cell--time" key={dayId}>{this.props.total.days.byId[dayId]}</div>
          )}
        </div>
        {this.props.tasks.ids.map(taskId =>
          <div className="grid__row" key={taskId}>
            <div className="grid__cell grid__cell--task-name">{this.props.tasks.byId[taskId].name}</div>
            {this.props.tasks.byId[taskId].days.ids.map(dayId =>
              <input className="grid__cell grid__cell--time" key={dayId}
                value={this.props.tasks.byId[taskId].days.byId[dayId]} 
                data-taskid={taskId}
                data-dayid={dayId}
                onChange={this.onCellChanged} />
            )}
          </div>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Timetable)