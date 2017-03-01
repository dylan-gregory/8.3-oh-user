var React = require('react');

class MessagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-12">
        <form className="form-group" action="index.html" method="post">
          <input className="form-control" type="text" placeholder="Your message here!" />
          <button className="btn btn-success form-control">Send your message!</button>
        </form>
      </div>
    )
  }
}

module.exports = {
  MessagesContainer
};
