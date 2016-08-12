const React = require('react');

const FeedListItem = React.createClass({
  render () {
    return(

      <div className="feed-item">

        <ul>
          <li className="date">- {this.props.feeds.date}</li>
          <li className="title">{this.props.feeds.title}</li>
          <li className="description">{this.props.feeds.description}</li>
          <ul className="stats group">
            <li>{this.props.feeds.start_time}</li>
            <li>{this.props.feeds.total_time} hrs</li>
          </ul>
        </ul>

      </div>

    );
  }
});

module.exports = FeedListItem;
