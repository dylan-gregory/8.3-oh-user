var React = require('react');
var MessageCollection = require('../models/message.js').MessageCollection;

var Message = require('../models/message.js').Message;

class MessagesContainer extends React.Component {
  constructor(props) {
    super(props);

    var messageCollection = new MessageCollection();
    this.state = {
      messageCollection
    }
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(message) {
    var messageList = this.state.messageCollection;
    messageList.user = localStorage.getItem('username');
    messageList.create(message);
    this.setState({messageCollection: messageList});
    console.log(messageList);
  }
  render() {
    return (
      <div>
        <MessageForm sendMessage={this.sendMessage}/>
        <ul>
          <li>Messages</li>
        </ul>
      </div>
    )
  }
}

class MessageForm extends React.Component {
  constructor(props){
    super(props);

    var message = new Message();
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    this.state = {
      message: ''
    };

  }
  sendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state);
    this.setState({message:''});
  }
  handleMessage(e){
    this.setState({message: e.target.value});
  }
  render(){
    return (
      <div className="col-md-12">
        <form onSubmit={this.sendMessage} className="form-group" action="index.html" method="post">
          <input onChange={this.handleMessage} className="form-control" type="text" placeholder="Your message here!" value={this.state.message} />
          <button className="btn btn-success form-control">Send your message!</button>
        </form>
      </div>
    )
  }
}

module.exports = {
  MessagesContainer
};
