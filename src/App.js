import React from 'react';
import moment from 'moment';
import './App.scss';

const phrases = ['Ok', 'No', 'Nice weather today', ':)', 'Do you like this chat?', 'I hear you', 'Cool', 'Hi', 'Hello again!', 'Nice to be back'];
let timer = null;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: '',
      isLoading: false,
    };
  }

  generateResponse() {
    this.setState({ isLoading: true });
    timer = setTimeout(() => {
      this.setState({
        isLoading: false,
        messages: [...this.state.messages, { msg: phrases[Math.floor(Math.random() * phrases.length)], date: moment().format('h:mm a'), sender: null }],
      });
    }, Math.random() * 2200);
  }

  /* Handlers */
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleInput(event) {
    // If we press enter
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      this.handlePublish('user');
    }
  }

  handlePublish(user) {
    if (this.state.value !== '') {
      clearTimeout(timer);
      this.generateResponse();
      this.setState({ value: '', messages: [...this.state.messages, { msg: this.state.value, date: moment().format('h:mm a'), sender: user }] }, () => {
        console.log(this.state);
        this.refs.messagescontainer.scrollTop = this.refs.messagescontainer.scrollHeight - this.refs.messagescontainer.clientHeight;
      });
    }
  }

  /* Render functions */
  renderInput() {
    return (
      <div className='chat-input'>
        <input placeholder='Enter your message' value={this.state.value} onKeyDown={this.handleInput.bind(this)} onChange={this.handleChange.bind(this)} type='text' />
        <button onClick={this.handlePublish.bind(this, 'user')}>Send</button>
      </div>
    );
  }

  renderMessages() {
    return (
      <div ref='messagescontainer' className='chat-messages'>
        {this.state.messages.map(msg => {
          const type = msg.sender ? msg.sender : 'default';
          return (
            <div className={`chat-message chat-message_${type}`}>
              <div className='chat-message_time'>{msg.date}</div>
              <div className={`chat-bubble chat-bubble_${type}`}>
                <div className='chat-bubble_text'>{msg.msg}</div>
              </div>
            </div>
          );
        })}
        {this.state.isLoading && <div className='chat-bubble_loading'>Laddar</div>}
      </div>
    );
  }

  render() {
    return (
      <div className='chat'>
        {this.renderMessages()}
        {this.renderInput()}
      </div>
    );
  }
}
