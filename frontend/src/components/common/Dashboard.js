import  React       ,{ 
        Component   ,}  from 'react'
import  {connect    ,}  from 'react-redux'

import  SearchBar   from './SearchBar'
import  Tweets      from "./../tweets/Tweets"

import  "./Dashboard.css"


class Dashboard extends Component {
    render() {
        return (
            <div className="container dashboard-container">
                <div className="row">
                        <SearchBar/>
                </div>
                <ul className="nav justify-content-center">
                    <li><a className="nav-link" data-toggle="tab" href="#tweets">Tweets</a></li>
                    <li><a className="nav-link" data-toggle="tab" href="#people">People</a></li>
                </ul>
                <Tweets/>
            </div>
        )
    }
}

export default connect()(Dashboard)