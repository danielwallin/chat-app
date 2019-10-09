import React from 'react';
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
      this.setState({ isLoading: false, messages: [...this.state.messages, { msg: phrases[Math.floor(Math.random() * phrases.length)], date: new Date(), sender: null }] });
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
      this.setState({ value: '', messages: [...this.state.messages, { msg: this.state.value, date: new Date(), sender: user }] }, () => {
        console.log(this.state);
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
      <div className='chat-messages'>
        {this.state.messages.map(msg => {
          return (
            <div className={`chat-bubble chat-bubble_${msg.sender ? msg.sender : 'default'}`}>
              <div className='chat-bubble_text'>{msg.msg}</div>
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
