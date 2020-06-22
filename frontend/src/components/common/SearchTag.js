import  React       ,{ 
        Component   ,}  from 'react'
import  Settings        from '@material-ui/icons/Settings'
import  Close           from '@material-ui/icons/Close'

import  Filter          from  "./../tweets/Filter"

import  "./SearchTag.scss"

export default class SearchTag extends Component {
    state = {
        id_         : this.props.id_    ,
        tag         : this.props.tag    ,
        color       : this.props.color  ,
        
        n_tweets    : 5         ,

        lng         : 150.644   ,
        lat         : -34.397   ,
        radius      : 0         ,
        language    : "ANY"     ,
        type_       : "ALL"     ,
        retweets    : 0         ,
        favorites   : 0         ,
        
    }

    onChangeUpdate  = (n,v) =>  {
        this.props.updateTag(this.state.id_,n,v)
        this.setState({
            n : v,
        })
    }
    onChange        = (e)   =>  {
        this.props.updateTag(this.state.id_,e.target.name,e.target.value)
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    render() {
        const id_   = this.state.id_
        return (
            <ul className="nav tag-ul" style={{backgroundColor: this.state.color}}>
                <li>
                    <input className="input-tag" type="text" name="tag" value={this.state.tag} onChange={this.onChange}/>
                </li>
                <li>
                    <div className="dropdown">
                        <button className="btn" type="button" id={`dropdownMenuButton${id_}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <Settings></Settings>
                        </button>
                        <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton${id_}`}>
                            <form>
                                <div className="form-group row" >
                                    <label className="col col-form-label" htmlFor="n_tweets">Number of tweets</label>
                                    <div className="col-4">
                                        <input  className="form-control-plaintext input-nTweets" 
                                                type="number" 
                                                className="form-control" 
                                                onChange={this.onChange} 
                                                value={this.state.n_tweets} 
                                                name="n_tweets" />
                                    </div>
                                </div>
                                <div className="form-group row" >
                                    <label className="col col-form-label" htmlFor="color">Color</label>
                                    <div className="col-4">
                                        <input  className="form-control-plaintext input-nTweets" 
                                                type="color" 
                                                className="form-control" 
                                                onChange={this.onChange} 
                                                value={this.state.color} 
                                                name="color" />
                                    </div>
                                </div>
                                <Filter onChangeUpdate = {this.onChangeUpdate} id_={id_} filters={this.props.filters}/>
                            </form>
                        </div>
                    </div>
                </li>
                <li>
                    <button className   = "btn" 
                            onClick     = {()=>{this.props.onDelete(this.state.id_)}}>
                        <Close></Close>
                    </button>
                </li>
            </ul>
        )
    }
}
