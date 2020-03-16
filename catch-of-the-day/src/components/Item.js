import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Item extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string,
            status: PropTypes.string, 
            desc: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    };

    handleClick =() => {
        this.props.addToOrder(this.props.index);
    }
    
    render() {
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className="store-item">
                <img src={image} alt={name}></img>
                <h3 className="item-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick} >{
                    isAvailable ? 'Add To Order' : 'Sold Out!'}
                </button>
            </li> 
        );
    }
}

export default Item;