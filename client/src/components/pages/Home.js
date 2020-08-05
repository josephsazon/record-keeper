import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { loadUser } from '../../state/actions/authActions';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return <div className="container">Home page</div>;
};

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Home);
