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

class App extends React.Component {
   
    componentDidMount(){
        this.props.onTryAutoSignup();
    }

     routes = (
     
        <Switch>
            <Route path='/' component={Home} exact />
            <Route exact path='/tools' component={Tools} />
            <Route exact path='/tools/:id' component={ToolDetail} />

            <Route exact path='/about' component={About} />
        </Switch>

    )
    render()
    {return (
        <Layout>
            {this.routes}
        </Layout>
    );}
    
}
 const mapStateToProps = state =>{
    return{
       isAuthenticated:state.token !==null 
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onTryAutoSignup: ()=> dispatch(action.authCheckState())
    }
}

// export default withRouter(App);
const ShowTheLocationWithRouter = withRouter(App);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);
// export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps)(App)) ;
