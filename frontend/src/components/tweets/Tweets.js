import  React       ,{ 
        Component   ,}  from 'react'
import  axios           from 'axios'
import  {connect}       from 'react-redux'
import  {withAlert}     from 'react-alert'
import  LoadingOverlay  from 'react-loading-overlay'
import  TimeAgo         from 'javascript-time-ago'
import  en              from 'javascript-time-ago/locale/en'
import {  } from "@material-ui/core/";

import  "./Tweets.scss"

TimeAgo.addLocale(en)

class Tweets extends Component {
    onHide       = (e)   =>  {}
    onSave       = (e)   =>  {}

    render() {
        const timeAgo = new TimeAgo('en-US')
        
        const people_array  = this.props.people.map(x=>x.user)
        var   people  = {}
        people_array.map(p => {
            people[p.name]  = p
        })
        people  = Object.values(people)
        return (
            <LoadingOverlay
                active={this.props.isLoading}
                spinner
                text='Fetching tweets ...'
                >
                <div className="tab-content">
                    <div id="tweets" className="tab-pane fade in overflow-auto active show mb-2">
                        <div className="list-group">
                        {this.props.tweets.map(x => (
                            <a      style       = {{backgroundColor:x.color}} 
                                    href        = {`https://mobile.twitter.com/${x.user.screen_name}/status/${x.id_str}`}
                                    target      = "_blank"
                                    key         = {x.id_str} 
                                    className   = "mt-2 list-group-item list-group-item-action flex-column align-items-start active">
                                <div className="d-flex w-100 justify-content-between">
                                    <img src={x.user.profile_image_url_https} alt="Avatar" className="avatar"/>
                                    <a target="_blank" href={"https://twitter.com/"+x.user.screen_name} className="mb-1">{x.user.name}@{x.user.screen_name}</a>
                                    <small>{timeAgo.format(Date.parse(x.created_at))}</small>
                                </div>
                                <p className="mb-1">{x.text}</p>
                                <small>
                                    {x.retweet_count}
                                    <svg className="ml-2 mr-2" style={{width:"20px",height:"20px"}} viewBox="0 0 24 24"><g><path style={{fill: "#BDC3C7"}} d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                                    {x.favorite_count}
                                    <svg viewBox="0 0 24 24" style={{width:"20px",height:"20px"}} className="ml-2 mr-2"><g><path style={{fill: "#BDC3C7"}} d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                </small>
                          </a>
                        ))}
                        </div>
                    </div>
                    <div id="people" className="tab-pane fade overflow-auto">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <h5 className="col-sm">USER</h5>
                                    <h5 className="col-sm">TWEETS</h5>
                                    <h5 className="col-sm">FRIENDS</h5>
                                    <h5 className="col-sm">FOLLOWERS</h5>
                                </div>
                            </li>
                            {people.map(x => (
                                <li     className   = "list-group-item"
                                        key         = {x.id_str} >
                                    <a  style       = {{backgroundColor:"#"+x.profile_background_color}}  
                                        target      = "_blank" 
                                        href        = {"https://twitter.com/"+x.screen_name} className="mb-1">
                                        <div className="row">
                                            <div className="col-sm"> 
                                                <img src={x.profile_image_url_https} alt="Avatar" className="avatar"/>
                                                <p className="col-sm">{x.name} @{x.screen_name}</p>
                                            </div>
                                            <p className="col-sm">{x.statuses_count}</p>
                                            <p className="col-sm">{x.followers_count}</p>
                                            <p className="col-sm">{x.friends_count}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </LoadingOverlay>
        )
    }
}

const mapStateToProps       = state     => ({ tweets: state.tweets ,people: state.people ,isLoading: state.isLoading})
const mapDispatchToProps    = dispatch  => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Tweets))