import React, {useEffect} from 'react';
import Layout from './components/Layout/Layout';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {compose} from 'redux';
import Tools from "./containers/Tools/Tools";
import Home from "./components/Home";
import About from './components/About/About';

import ToolDetail from "./containers/ToolDetail/ToolDetail";
import Profile from './containers/Profile/Profile';
import Reviews from "./containers/Reviews/Reviews";
import Auth from "./containers/Auth/Auth";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Logout from "./containers/Auth/Logout";
import AddTool from "./containers/AddTool/AddTool";


function App() {
    const routes = (

        <Switch>
            <Route path='/' component={Home} exact/>

            <Route exact path='/tools' component={Tools}/>
            <Route exact path='/tools/add' component={AddTool} />
            <Route exact path='/tools/:toolId' component={ToolDetail}/>
            <Route exact path='/tools/:toolId/reviews' component={Reviews}/>
            <PrivateRoute exact path='/profile/:userN' component={Profile}/>
            <Route exact path='/about' component={About}/>
            {/* Auth routes */}
            <Route exact path='/auth' component={Auth}/>
            <PrivateRoute exact path='/auth/logout/' component={Logout} />
        </Switch>
    );

    return (
        <AuthProvider>
            <Layout>
                {routes}
            </Layout>
        </AuthProvider>
    );

}

export default App;
