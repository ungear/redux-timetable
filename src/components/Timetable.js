import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import "./Timetable.css";
const mapStateToProps = function(state){
  return {
    tasks: state.tasks,
    total: state.total,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    //getTopByLikes: getTopByLikes,
  }, dispatch)
}


class Timetable extends Component {
  componentDidMount(){
  }

  render(){
    return (
      <div className="grid">
        <div className="grid__row grid__row--header">
          <div className="grid__cell grid__cell--task-name"></div>
          {this.props.total.days.ids.map(dayId =>
            <div className="grid__cell grid__cell--time">{this.props.total.days.data[dayId]}</div>
          )}
        </div>
        {this.props.tasks.ids.map(taskId =>
          <div className="grid__row">
            <div className="grid__cell grid__cell--task-name">{this.props.tasks.data[taskId].name}</div>
            {this.props.tasks.data[taskId].days.ids.map(dayId =>
              <div className="grid__cell grid__cell--time">{this.props.tasks.data[taskId].days.data[dayId]}</div>
            )}
          </div>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Timetable)