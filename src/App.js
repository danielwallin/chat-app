import React from 'react';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: '',
      isLoading: false,
    };
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

  render() {
    return <div className='app'>{this.renderInput()}</div>;
  }
}
