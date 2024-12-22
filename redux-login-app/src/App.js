import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;