import React from 'react';
import PropTypes from 'prop-types';

// (React) stateless functional component 
// (ES6) arrow function with implicit return 
const Header = (props) => (
    <header className="store">
        <h1 id="yarn">Yarn</h1>
        <img src="../images/yarn-logo.png" alt="yarn-logo" id="yarn-logo"/>
        <h1 id="shop">Shop</h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;
