import alt from '../lib/AltInstance';
import adminAction from '../actions/adminAction';
import ImmutableStore from 'alt/utils/ImmutableUtil';
import constants from '../constants/constants';
import notify from 'bootstrap-growl';
import request from 'superagent';
import _ from 'lodash';

class AdminStore {
    constructor() {
        this.bindListeners({
            loggedIn: adminAction.loggedIn,
            loggedOut: adminAction.loggedOut,
            unsuccessfulLogin: adminAction.unsuccessfulLogin,
            newVacation: adminAction.newVacation,
            deleteVacation: adminAction.deleteVacation,
            selectFollower: adminAction.selectFollower
        });
    }

    loggedIn(token) {
        var msg = $.notify('You have successfully logged in.', {type: 'success'});
        var self = this;
        request
            .get(constants.apiroot + 'vacation')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                if (res.status === 200) {
                    self.setState({token: token, vacation: res.body});
                    self.openUpdater(token);
                    request
                        .get(constants.apiroot + 'follower')
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(err, res) {
                            var currState = self.state;
                            currState.followers = res.body;
                            self.setState(currState);
                            console.log(self.state);
                        })
                } else {
                    console.log(err);
                    self.actions.unsuccessfulLogin();
                }
            });
    }

    loggedOut() {
        var msg = $.notify('You have been logged out.', {type: 'success'});
        this.setState({token: null});
    }

    unsuccessfulLogin() {
        var msg = $.notify('Invalid password.', {type: 'danger'});
    }

    newVacation(obj) {
        var msg = $.notify('Vacation added.');
        var currState = this.state;
        var vacas = currState.vacation;
        vacas.push(obj);
        currState.vacation = vacas;
        this.setState(currState);
    }

    deleteVacation(obj) {
        var msg = $.notify('Vacation deleted.');
        var currState = this.state;
        var vacas = currState.vacation;
        vacas = _.filter(vacas, function(v) {
            if (v._id != obj.id) {
                return v;
            }
        });
        currState.vacation = vacas;
        this.setState(currState);
    }

    selectFollower(obj) {
        var currState = this.state;
        currState.selectedFollower = obj;
        this.setState(currState);
    }

    openUpdater(token) {
        var source = new EventSource(constants.apiroot + 'secureupdate/' + token);
        source.addEventListener('newvacation', function (e) {
            console.log('Got an update for a new vacation');
            console.log(e);
            var j = JSON.parse(e.data);
            adminAction.newVacation(j);
        }, false);
        source.addEventListener('deletevacation', function (e) {
            console.log('Got an update to delete a vacation');
            console.log(e);
            var j = JSON.parse(e.data);
            adminAction.deleteVacation(j);
        }, false);
        source.addEventListener('open', function (e) {
            console.log('secure connection established');
        }, false);
        source.onerror = function (e) {
            console.log(e);
        }
    }
}

export default alt.createStore(ImmutableStore(AdminStore), 'AdminStore');
