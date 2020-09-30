import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';

const Dummy = React.memo(() => {
  return (
    <Row>
      <Col lg={1} md={1} sm={0} />

      <Col lg={10} md={10} sm={12}>
        <h1>
          Foo
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </Col>

      <Col lg={1} md={1} sm={0} />
    </Row>
  );
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    return(
      <>
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
        <Dummy />
      </>
    );
  }
}

Home.propTypes = {

};

Home.defaultProps = {

};

export default Home;
