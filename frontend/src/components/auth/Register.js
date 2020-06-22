import  React       ,{
        Component   ,}  from "react"
import  axios           from "axios"
import  {withAlert  ,}  from "react-alert"
import  {connect    ,}  from "react-redux"
import  {Redirect   ,}  from 'react-router-dom'

import  "./Register.css"

class Register extends Component {
    state       =           {
        username    : null,
        email       : null,
        password    : null,
    }

    onChange    =   e =>    {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit    =   e =>    {
        e.preventDefault();

        axios.post  (
                "/api/v1/auth/register"                         ,
                JSON.stringify(this.state)                      ,
                {headers: {"Content-Type": "application/json"}} ,
            ).then  (
                res => {
                    console.log(res);
                    
                    this.props.register_success(res)
                }
            ).catch (
                err => {
                    this.props.alert.error(err.response.data);
                    this.props.register_failure(err);
                });
        
    }

    render          ()      {
        if (this.props.token != null){
            return  <Redirect to='/dashboard' />  
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form  onSubmit={this.onSubmit}>
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input  type        = "text"
                                    className   = "form-control"
                                    placeholder = "Enter username"
                                    onChange    = {this.onChange}
                                    name        = "username"/>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input  type        = "email"
                                    className   = "form-control" 
                                    placeholder = "Enter email" 
                                    onChange    = {this.onChange}
                                    name        = "email"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input  type        = "password"
                                    className   = "form-control"
                                    placeholder = "Enter password"
                                    onChange    = {this.onChange}
                                    name        = "password"/>
                        </div>

                        <button type        = "submit"
                                className   = "btn btn-primary btn-block">
                                Register
                        </button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">Login?</a>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps       = state     => ({ token: state.token })
const mapDispatchToProps    = dispatch  => ({
    register_success    : (res) => dispatch({
        type    : "REGISTER_SUCCESS"    ,
        payload : res.data              ,
      }),
      register_failure  : (res) => dispatch({
        type    : "REGISTER_FAILURE"   ,
        payload : res.data              ,
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Register))
