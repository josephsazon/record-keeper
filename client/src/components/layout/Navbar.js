import React from 'react';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated } }) => {
  return (
    <nav className="blue lighten-1" style={{ marginBottom: '30px' }}>
      {isAuthenticated && (
        <a href="#slide-out" className="sidenav-trigger show-on-large">
          <i className="material-icons">menu</i>
        </a>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
