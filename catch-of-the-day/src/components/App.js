import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes'
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
        visible: false
    };

    static propTypes = { 
        match: PropTypes.object
    }

    static transitionOptions = {
        classNames: "fish-edit",
        timeout: { enter: 500, exit: 500 }
    }

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);        
    }

    addFish = (fish) => {
        // 1. take a copy of existing state 
        const fishes = {...this.state.fishes};
        // 2. add new fish to fishes var
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state
        this.setState({ fishes });
        // this.setState({
        //     fishes: fishes
        // });
    } 

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes })
    }

    deleteFish = (key) => {
        // 1. take a copy of existing state
        const fishes = {...this.state.fishes};
        // 2. set fish to null to delete (firebase)
        fishes[key] = null;
        // 3. update state
        this.setState({ fishes });

    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }
    
    addToOrder = (key) => {
        // 1. take a copy of existing state
        const order = {...this.state.order};
        // 2. either add to order or update the order qty
        order[key] = order[key] + 1 || 1;
        // 3. call set state
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
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header tagline="Love in Every Twist"/>
                        <ul className="fishes">
                            {Object.keys(this.state.fishes).map(key => (
                                <Fish 
                                    key={key} 
                                    index={key}
                                    details={this.state.fishes[key]} 
                                    addToOrder={this.addToOrder} 
                                />
                            ))}
                        </ul>
                    </div>
                    <Order 
                        fishes={this.state.fishes} 
                        order={this.state.order}
                        removeFromOrder={this.removeFromOrder}
                    />
                    <Inventory 
                        visible={this.state.visible}
                        openAdminPanel={this.openAdminPanel}
                        addFish={this.addFish} 
                        updateFish={this.updateFish}
                        deleteFish={this.deleteFish}
                        loadSampleFishes={this.loadSampleFishes} 
                        fishes={this.state.fishes}
                        storeId={this.props.match.params.storeId}
                    />
                </div>
            </>
        );
    }
}

export default App;