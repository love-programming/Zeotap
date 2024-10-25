import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { DailyWeatherSummary } from "./component/DailyWeatherSummary";
import { Weather } from "./component/Weather";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/dailyWeatherSummary"
            component={DailyWeatherSummary}
          />
          <Route exact path="/" component={Weather} />
        </Switch>
      </Router>
      {/* <Weather />
      <DailyWeatherSummary /> */}
    </div>
  );
}

export default App;
