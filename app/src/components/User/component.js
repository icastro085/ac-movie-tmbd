import React, { Component, Fragment } from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import gapi from 'gapi';
import axios from 'axios';

import Menu from './Menu';
import Profile from './Profile';
import Address from './Address';
import GoogleAuth from './GoogleAuth';

import { saveAddress, getAddress } from './../../services/user';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      address: {},
    };
  }

  componentDidMount() {
    const { changeTitle } = this.props;
    changeTitle('User Profile');

    gapi.load('auth2');

    gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': (googleUser) => {
        const user = {
          name: googleUser.getBasicProfile().getName(),
          email: googleUser.getBasicProfile().getEmail(),
          picture: googleUser.getBasicProfile().getImageUrl(),
        };

        axios.defaults.headers.common['Authorization'] = (
          'Basic ' + googleUser.getAuthResponse().id_token
        );

        this.setState({ user }, () => {
          getAddress(user.email)
            .then((address) =>this.setState({ address }))
            .catch(() => {
              toastr.warning('Something goes wrong!!');
            });
        });
      },
      'onfailure': () => {
        toastr.warning('Something goes wrong!!');
      }
    });
  }

  onChangeAddress(field, value) {
    const { address } = this.state;
    address[field] = value.trim();
  }

  saveAddress() {
    const { user, address } = this.state;
    address.email = user.email;
    saveAddress(address)
      .then(() => toastr.success('Address saved!'))
      .catch(() => toastr.warning('Something goes wrong!!'));
  }

  render() {
    const { user, address } = this.state;

    return (
      <div className="mt-5">
        {
          user && <Fragment>
            <Menu />
            <div className="user-content">
              <Route exact path="/user" render={() => <Profile {...user} />} />
              <Route
                exact path="/user/address"
                render={() => (
                  <Address
                    {...address}
                    onChangeAddress={(field, value) => this.onChangeAddress(field, value)}
                    saveAddress={() => this.saveAddress()}/>
                )}
              />
            </div>
          </Fragment>
          || <GoogleAuth />
        }
      </div>
    );
  }
}
