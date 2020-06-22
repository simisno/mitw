import  React           from "react"
import  {Route      ,
        Redirect    ,}  from "react-router-dom"
import  {connect    ,}  from 'react-redux'

const PrivateRoute = ({ component: Component,token, ...rest }) => (
        <Route  {...rest}
                render={(props) => (
                    token != null
                    ? <Component {...props} />
                    : <Redirect to='/login' />  
                )}
            />
    )

const mapStateToProps = (state) => ({
    token : state.token    ,
    });

export default connect(mapStateToProps)(PrivateRoute);