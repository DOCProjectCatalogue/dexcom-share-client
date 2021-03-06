import React                    from 'react';
import {RouteHandler, Link, browserHistory} from 'react-router';
import adminStore from '../stores/adminStore';
import adminAction from '../actions/adminAction';
import trend from './trend';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {error: null};
    }

    componentDidMount() {
        adminStore.listen(this.onChange);
    }

    componentWillUnmount() {
        adminStore.unlisten(this.onChange);
    }

    onChange(event) {
        var t = adminStore.getState();
        if (t.token) {
            this.props.history.push('/');
        }
    }

    login(e) {
        e.preventDefault();
        adminAction.login(this.refs.password.value);
    }

    render() {
        return (
            <div className="offset-top">
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Admin Login</h3>
                        </div>
                        <div className="panel-body">
                            <div className="text-left col-sm-12">
                                <form>
                                    <fieldset className="form-group">
                                        <label htmlFor="password">Admin Password:</label>
                                        <input type="password" className="form-control" ref="password"/>
                                    </fieldset>
                                    <button className="btn btn-success" onClick={this.login}>Submit</button>
                                    <Link to="/">
                                        <button className="btn btn-danger">Cancel</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="offset-bottom">&nbsp;</div>
            </div>
        )
    }
}

export
default
Main;
