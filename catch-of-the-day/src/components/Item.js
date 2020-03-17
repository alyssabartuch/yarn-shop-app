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
                    <div className="item-header">
                        <div className="item-name">{name}</div>
                        <div className="price"><span>{formatPrice(price)}</span></div>
                    </div>
                    <div className="item-info">
                        <div className="item-desc">
                            <p>{desc}</p>
                            <button className="add-to-order-btn" disabled={!isAvailable} onClick={this.handleClick} >{
                            isAvailable ? 'Add To Order' : 'Sold Out!'}
                            </button>
                        </div>   
                        <div className="img-container">
                            <img className="item-photo" src={image} alt={name}></img>
                        </div>
                    </div>
                    
            </li> 
        );
    }
}

export default Item;