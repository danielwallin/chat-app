import React from 'react';
import moment from 'moment';
import './App.scss';

const phrases = ['Ok', 'No', 'Nice weather today, huh?', ':)', 'Do you like this chat?', 'I hear you', 'Cool', 'Hi', 'Hello again!', 'Nice to be back', 'Sure!'];
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
      this.setState(
        {
          isLoading: false,
          messages: [...this.state.messages, { msg: phrases[Math.floor(Math.random() * phrases.length)], date: moment().format('h:mm a'), sender: null }],
        },
        () => {
          this.scrollToBottom();
        },
      );
    }, Math.random() * 2500);
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
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    this.refs.messagescontainer.scrollTop = this.refs.messagescontainer.scrollHeight - this.refs.messagescontainer.clientHeight;
  }

  /* Render functions */
  renderInput() {
    return (
      <div className='chat-input'>
        <input placeholder='Type something' value={this.state.value} onKeyDown={this.handleInput.bind(this)} onChange={this.handleChange.bind(this)} type='text' />
        <button onClick={this.handlePublish.bind(this, 'user')}>
          <ion-icon name='ios-send'></ion-icon>
        </button>
      </div>
    );
  }

  renderHeader() {
    return (
      <header className='chat-header'>
        <span>Chat</span>
        <button>
          <ion-icon name='ios-close'></ion-icon>
        </button>
      </header>
    );
  }

  renderMessages() {
    return (
      <main className='chat-main'>
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
          {this.state.isLoading && (
            <div className='chat-bubble_loading'>
              <span class='dot'></span>
              <span class='dot'></span>
              <span class='dot'></span>
            </div>
          )}
        </div>
      </main>
    );
  }

  render() {
    return (
      <div className='chat'>
        {this.renderHeader()}
        {this.renderMessages()}
        {this.renderInput()}
      </div>
    );
  }
}
