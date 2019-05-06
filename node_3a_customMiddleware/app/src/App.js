import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogin: "false"
    };
    this.getCurrentUser();
  }

  isAuthenticated = (loginState) => {
    this.setState({
      isLogin: loginState
    });
  };

  getCurrentUser = () => {
      axios.get('http://127.0.0.1:8080/auth')
          .then((response) => {
              if(response.data.status === undefined){
                  this.setState({
                      isLogin: response.data.activeStatus,
                      username: response.data.username,
                      password: response.data.password
                  });
              }
          })
          .catch((error) => {
              console.log(error);
          })
  };

  render() {
      return (
          <Router>
              <Switch>
                <PrivateRoute isAuth={this.state.isLogin} component={Dashboard} path={'/dashboard'}/>
                <Route path={'/'} component={(props) => <Login
                    isAuthCB={this.isAuthenticated}
                    getCurrentUserCB={this.getCurrentUser}
                    isUserLoggedIn={this.state.isLogin}
                    {...props}
                />}
                />
              </Switch>
          </Router>

      )
  }
}

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
  if (isAuth === "true") {
    return <Route {...rest} render={(props) => <Component {...props}/>}/>
  } else {
    console.log("Invalid login");
    // return <Route {...rest} render={(props) => <Redirect {...props} to={'/'}/>
    return <Route {...rest} render={(props) => <Login {...props}/>
    }/>
  }
};

export default App;
