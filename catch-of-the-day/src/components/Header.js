import React from 'react';
import PropTypes from 'prop-types';

// (React) stateless functional component 
// (ES6) arrow function with implicit return 
const Header = (props) => (
    <header className="top">
        <h1>Yarn Shop</h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;
