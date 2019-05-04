import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const { changeTitle } = this.props;

    changeTitle('Home');
  }

  render() {
    return (
      <p>
        Hello
      </p>
    );
  }
}
