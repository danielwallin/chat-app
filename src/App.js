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
    console.log(event);
  }

  handleInput(event) {
    console.log(event);
  }

  handlePublish() {
    console.log('Publish');
  }

  /* Render functions */
  renderInput() {
    return (
      <div className='chat-input'>
        <input placeholder='Enter your message' onKeyDown={this.handleInput.bind(this)} onChange={this.handleChange.bind(this)} type='text' />
        <button onClick={this.handlePublish.bind(this)}>Send</button>
      </div>
    );
  }

  render() {
    return <div className='app'>{this.renderInput()}</div>;
  }
}
