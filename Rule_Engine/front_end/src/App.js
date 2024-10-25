import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import CreatedRules from './components/CreatedRules'
import EvulateRules from './components/EvulateRules'
import CombineRules from './components/CombineRules'
import UpdateRules from './components/UpdateRules'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/CombineRules" component={CombineRules} />
          <Route exact path="/CreatedRules" component={CreatedRules} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/EvulateRules" component={EvulateRules} />
          <Route exact path="/UpdateRules" component={UpdateRules} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
