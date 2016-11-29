import React                    from 'react';
import {Router, Route} from 'react-router';
import Main from 'components/home';
import Layout from 'components/layout';
import About from 'components/about';
import Login from 'components/login';
import Vacation from 'components/vacation';
import AddVacation from 'components/addvacation';
import Followers from 'components/follower';

const routes = (
    <Route path="layout" component={Layout}>
        <Route name='main' path="/" component={Main}/>
        <Route name="about" path="/about" component={About} />
        <Route name="login" path="/login" component={Login} />
        <Route name="vacation" path="/vacation" component={Vacation} />
        <Route name="addvacation" path="/addvacation" component={AddVacation} />
        <Route name="followers" path="/followers" component={Followers} />
    </Route>
);

export default routes;
