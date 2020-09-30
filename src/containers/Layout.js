import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import './Layout.css';
import Navigation from '../components/Header/Navigation/Navigation';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect(url) {
    const { history } = this.props;

    history.push(url);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Navigation />
        <Container fluid className="layout-container">
          {children}
        </Container>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired
};

Layout.defaultProps = {
  children: null
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
