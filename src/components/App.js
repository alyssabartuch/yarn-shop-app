import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleItems from '../sample-items'
import Item from './Item';
import base from '../base';

class App extends React.Component {
    state = {
        items: {},
        order: {},
        visible: false
    };

    static propTypes = { 
        match: PropTypes.object
    }

    static transitionOptions = {
        classNames: "item-edit",
        timeout: { enter: 500, exit: 500 }
    }

    componentDidMount() {
        const { params } = this.props.match;
        
        // first reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/items`, {
            context: this,
            state: 'items'
        });
        
    }
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);        
    }

    addItem = (item) => {
        const items = {...this.state.items};
        items[`item${Date.now()}`] = item;
        this.setState({ items });
    } 

    updateItem = (key, updatedItem) => {
        const items = {...this.state.items};
        items[key] = updatedItem;
        this.setState({ items })
    }

    deleteItem = (key) => {
        const items = {...this.state.items};
        items[key] = null;
        this.setState({ items });

    }

    loadSampleItems = () => {
        this.setState({ items: sampleItems });
    }
    
    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    openAdminPanel = () => {
        this.setState(prev => ({ visible: !prev.visible }))
    }

    render() {        
        return (
            <>
                <div className="yarn-shop">
                    <div className="menu">
                        <Header tagline="- - - Love in Every Twist - - -"/>
                        <ul className="items">
                            {Object.keys(this.state.items).map(key => (
                                <Item 
                                    key={key} 
                                    index={key}
                                    details={this.state.items[key]} 
                                    addToOrder={this.addToOrder} 
                                />
                            ))}
                        </ul>
                    </div>
                    <Order 
                        items={this.state.items} 
                        order={this.state.order}
                        removeFromOrder={this.removeFromOrder}
                    />
                    <Inventory 
                        visible={this.state.visible}
                        openAdminPanel={this.openAdminPanel}
                        addItem={this.addItem} 
                        updateItem={this.updateItem}
                        deleteItem={this.deleteItem}
                        loadSampleItems={this.loadSampleItems} 
                        items={this.state.items}
                        storeId={this.props.match.params.storeId}
                    />
                </div>
            </>
        );
    }
}

export default App;