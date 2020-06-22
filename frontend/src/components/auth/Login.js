import  React       ,{
        Component   ,}  from "react"
    
import  "./Login.css"
import  axios           from 'axios'
import  {Redirect}      from "react-router-dom"
import  {withAlert  ,}  from "react-alert"
import  {connect    ,}  from 'react-redux'

class Login extends Component {
    state       =           {
        username    : null,
        password    : null,
    }
    onChange    = (e)   => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit    = (e)   => {
        e.preventDefault();
        axios.post  (
                "/api/v1/auth/login"                            ,
                JSON.stringify({
                    username    : this.state.username   ,
                    password    : this.state.password   ,
                }),
                {headers: {"Content-Type": "application/json"}} ,
            ).then  (
                res => {
                    this.props.login(res)
                }
            ).catch (
                err => {this.props.alert.error(err.response.data);
                this.props.login_failure(err)
            
            });
    }
    render() {
        if (this.props.token != null){
            return  <Redirect to='/dashboard' />  
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input  type        = "text" 
                                    className   = "form-control" 
                                    placeholder = "Enter username" 
                                    name        = "username"
                                    onChange    = {this.onChange}   />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input  type        = "password"
                                    className   = "form-control"
                                    placeholder = "Enter password" 
                                    name        = "password"
                                    onChange    = {this.onChange}   />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps       = state     => ({ token: state.token })
const mapDispatchToProps    = dispatch  => ({
    login           : (res) => dispatch({
        type    : "LOGIN_SUCCESS"   ,
        payload : res.data          ,
      }),
    login_failure   : (res) => dispatch({
        type    : "LOGIN_FAILURE"   ,
        payload : res.data          ,
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Login))
