import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = function(state){
  return {
    test: state.test,
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
      <div>{this.props.test.name}</div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Timetable)