import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePage.css';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }


    handleSearchUser(id) {

    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="home">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand"  to="/" style={{textTransform:'uppercase'}}>WELCOME  {user.firstName}</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/">HOME</Link></li>
                        </ul>
                        <ul className="nav navbar-nav pull-right">
                            <li className="active"><Link to="/login">Logout</Link></li>
                        </ul>
                        <div className="search-container">
                        <input type="text" placeholder="Search.." name="search" value=""/>
                            <button type="submit" onClick={this.handleSearchUser}><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </nav>  
                <div className="pull-right">
                    <button className="btn btn-primary"><Link to="/register" style={{color:'#ffffff' }}>Add User</Link></button>
                </div>
                <div className="col-md-6 col-md-offset-2">
                <h3><u>All Registered Users</u></h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ol>
                            {users.items.map((user, index) =>
                            <li>
                                <div key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                </div>
                            </li>
                            )}
                        </ol>
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };