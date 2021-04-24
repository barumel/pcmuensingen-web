import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { get } from 'lodash';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr-ch';
import 'moment/locale/de-ch';

import './App.css';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Booking from './containers/Booking';
import Play from './containers/Play';
import messages from './intl/messages';
import flattenMessages from './lib/Intl/Utils/flattenMessages';
import userActions from './actions/User';

class App extends React.Component {
  constructor(props) {
    super(props);

    const {
      environment,
      user,
      userActions
    } = props;

    axios.defaults.baseURL = get(process, 'env.API_URL', 'http://localhost:8080/api');
    axios.defaults.headers.common = {};
    axios.defaults.headers.common['Accept-Language'] = 'de,en,fr';
    axios.defaults.timeout = 20000;

    const locale = get(user, 'locale', get(environment, 'locale', 'de-CH'));
    moment.locale(locale);

    userActions.whoAmIRequest();
  }

  render() {
    const { user, environment } = this.props;
    const locale = get(user, 'locale', get(environment, 'locale', 'de-CH'));

    return (
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])} onError={(err) => console.info(err.message)}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/booking" component={Booking} />
              <Route path="/play" component={Play} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  environment: PropTypes.object,
  user: PropTypes.object,
  userActions: PropTypes.object.isRequired
};

App.defaultProps = {
  environment: {},
  user: undefined
};

function mapStateToProps(state) {
  return {
    environment: state.environment,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
