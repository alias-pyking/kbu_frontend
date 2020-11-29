import React, {useEffect} from 'react';
import Layout from './components/Layout/Layout';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {compose} from 'redux';
import Tools from "./containers/Tools/Tools";
import Home from "./components/Home";
import About from './components/About/About';

import ToolDetail from "./containers/ToolDetail/ToolDetail";
import Reviews from "./containers/Reviews/Reviews";
import Auth from "./containers/Auth/Auth";
import { AuthProvider } from './contexts/AuthContext';
function App() {
    const routes = (

        <Switch>
            <Route path='/' component={Home} exact/>

            <Route exact path='/tools' component={Tools}/>
            <Route exact path='/tools/:toolId' component={ToolDetail}/>
            <Route exact path='/tools/:toolId/reviews' component={Reviews}/>

            <Route exact path='/about' component={About}/>
            {/* Auth routes */}
            <Route exact path='/auth' component={Auth}/>
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
