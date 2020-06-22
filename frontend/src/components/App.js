import  React                           ,{
        Component                       ,}  from "react"
import  {
        HashRouter  as Router           ,
        Switch                          ,
        Route                           ,}  from "react-router-dom"
import  {
        Provider    as AlertProvider   ,}   from "react-alert"
import  AlertTemplate                       from "react-alert-template-basic"
import  {Provider                       ,}  from 'react-redux'
import  axios                               from "axios"

import Login        from "./auth/Login"
import Register     from "./auth/Register"
import Dashboard    from "./common/Dashboard"
import PrivateRoute from "./auth/PrivateRoute"

import store    from "./store"
import Nav      from "./common/Nav"

import  "./App.css"


const loadUser = () => (dispatch, getState) => {
    const config  = {
        headers: {
            'Content-Type'  : 'application/json'            ,
            'Authorization' : `Token ${getState().token}`   ,
          },
    }
    axios
        .get('/api/v1/auth/user', config)
        .then((res) => {
            dispatch({
                type      : "USER_LOADED"   ,
                payload   : res.data        ,
            });
        })
        .catch((err) => {
            dispatch({
                type      : "USER_NOT_LOADED"   ,
                payload   : err.data            ,
            });
        });
};

export default class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
      }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider
                    template    = {AlertTemplate}
                    timeout     = {5000}
                    >
                    <Router>
                        <div className="App">
                            <Nav></Nav>
                            <div className="main-container">
                                <Switch>
                                        <PrivateRoute   exact   path = '/'            component={Dashboard}     />
                                        <Route                  path = "/login"       component={Login}         />
                                        <Route                  path = "/register"    component={Register}      />
                                        <PrivateRoute           path = "/dashboard"   component={Dashboard}     />
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}