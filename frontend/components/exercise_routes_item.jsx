const React = require('react');

const ExerciseRoutesItem = React.createClass({


  render () {
    return(
      <div>
        <ul>
          <li>{this.props.route.title}</li>
          <li>{this.props.route.description}</li>
          <li>{this.props.route.map_info.toString()}</li>
        </ul>
      </div>
    );
  }
});

module.exports = ExerciseRoutesItem;
