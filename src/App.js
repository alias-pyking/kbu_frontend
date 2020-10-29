import React from 'react';
import Layout from './components/Layout/Layout';
import { Switch, Route, withRouter } from 'react-router-dom';
import Tools from "./containers/Tools/Tools";
import Home from "./components/Home";
import About from './components/About/About';
import ToolDetail from "./containers/ToolDetail/ToolDetail";
import Reviews from "./containers/Reviews/Reviews";


function App() {
    const routes = (
     
        <Switch>
            <Route path='/' component={Home} exact />
            <Route exact path='/tools' component={Tools} />
            <Route exact path='/tools/:toolId' component={ToolDetail} />
            <Route exact path='/tools/:toolId/reviews' component={Reviews}/>
            <Route exact path='/about' component={About} />
        </Switch>

    )
    return (
          <Layout>
              {routes}
          </Layout>
      );
}

export default withRouter(App);
