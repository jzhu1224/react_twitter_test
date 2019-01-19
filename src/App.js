import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import TwitterList from './containers/TwitterList';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TwitterDetail from './containers/TwitterDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Layout>
            <div>
              <Route exact path="/" component={TwitterList} />
              <Route path="/twitterDetail/" component={TwitterDetail} />
            </div>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
