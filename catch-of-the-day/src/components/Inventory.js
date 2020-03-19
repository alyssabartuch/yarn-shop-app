import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        openAdminPanel: PropTypes.func,
        items: PropTypes.object, 
        updateItem: PropTypes.func, 
        deleteItem: PropTypes.func, 
        addItem: PropTypes.func, 
        loadSampleItems: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async authData => {
        // 1. look up the current store in the firebase DB
        const store = await base.fetch(this.props.storeId, { context: this })
        console.log(store);
        
        // 2. claim it if there is no owner

        if (!store.owner) {
            // save it as the new owner
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. set the state of the inventory component to reflect the current user
        this.setState({ 
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
        console.log(store);
        
    }

    authenticate = (provider) => {         
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();                
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }


    logout = async () => {        
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Logout</button>
        // 1. check if user is logged in 
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }
        
        // 2. check if the user is NOT the store owner
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner of this store.</p>
                    {logout}
                </div>
            );
        }

        // 3. the user must be the store owner --> render inventory 
        return (
            <div id="admin-panel-container" className={this.props.visible ? 'slideIn' : 'slideOut'}>
                <button type="button" id="admin-panel-btn" className={this.props.visible ? 'open' : 'closed'} onClick={this.props.openAdminPanel}>Admin Pannel</button>

                <div id="admin-panel">
                    <div className="inventory">
                        <h2 id="inventory-header-title">Inventory</h2> 
                        <div className="logout-btn">{logout}</div>
                        {Object.keys(this.props.items).map(key => (
                                <EditItemForm 
                                    key={key} 
                                    index={key}
                                    item={this.props.items[key]} 
                                    updateItem={this.props.updateItem}
                                    deleteItem={this.props.deleteItem}
                                />    
                        ))}
                        <AddItemForm addItem={this.props.addItem}/>
                        <button onClick={this.props.loadSampleItems}>Load Sample Items</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inventory;