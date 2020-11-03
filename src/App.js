import React from 'react';
import Layout from './components/Layout/Layout';
import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Tools from "./containers/Tools/Tools";
import Home from "./components/Home";
import About from './components/About/About';
import * as action from './store/actions/auth';

import ToolDetail from "./containers/ToolDetail/ToolDetail";
import Reviews from "./containers/Reviews/Reviews";
import Auth from "./containers/Auth/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

class App extends React.Component {
   
    // componentDidMount(){
    //     this.props.onTryAutoSignup();
    // }

     routes = (
     
        <Switch>
            <PrivateRoute path='/' component={Home} exact />

            <Route exact path='/tools' component={Tools} />
            <Route exact path='/tools/:toolId' component={ToolDetail} />
            <Route exact path='/tools/:toolId/reviews' component={Reviews}/>

            <Route exact path='/about' component={About} />
            {/* Auth routes */}
            <Route exact path='/auth' component={Auth} />
        </Switch>

    )
    render() {
        return (
            <Layout>
                {this.routes}
            </Layout>
        );
    }
    
}
//  const mapStateToProps = state =>{
//     return{
//        isAuthenticated:state.token !==null
//     }
// }
//
// const mapDispatchToProps = dispatch =>{
//     return{
//         onTryAutoSignup: ()=> dispatch(action.authCheckState())
//     }
// }

// export default withRouter(App);
// const ShowTheLocationWithRouter = withRouter(App);

export default App;
// export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps)(App)) ;
