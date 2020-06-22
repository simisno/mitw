import  React                   ,{
        Component               ,}  from 'react'

import  FormatQuoteRoundedIcon          from '@material-ui/icons/FormatQuoteRounded';
import  LocationOnRoundedIcon           from '@material-ui/icons/LocationOnRounded';
import  FavoriteBorderRoundedIcon       from '@material-ui/icons/FavoriteBorderRounded';
import  KeyboardArrowDownRoundedIcon    from '@material-ui/icons/KeyboardArrowDownRounded';
import  KeyboardArrowUpRoundedIcon      from '@material-ui/icons/KeyboardArrowUpRounded';

import  Map from "./Map"

import  "./Filter.scss"
export default class Filter extends Component {

    state   = {
        lng         : 150.644   ,
        lat         : -34.397   ,
        radius      : 0         ,

        language    : "ANY" ,
        type_       : "ALL" ,
        retweets    : 0     ,
        favorites   : 0     ,

        place       : {
            lat     : -34.397   ,
            lng     : 150.644   ,
            radius  : 0         ,
        }

    }
    componentDidMount   = ()  =>  {
        const filters = this.props.filters 
        if (filters && !filters.includes(this)){
            filters.push(this)
        }
    }

    updateInputs    = (x)           =>  {
        this.onChange("lat",x.lat)
        this.onChange("lng",x.lng)
    }
    onChange        = (name, value) =>  {
        this.props.onChangeUpdate(name,value)
        this.setState({
            [name] : value
        })

        
        if (["lng","radius","lat"].includes(name) )
        {
            const place   = {
                lat : parseFloat(this.state.lat)    ,
                lng : parseFloat(this.state.lng)    ,
                radius : parseFloat(this.state.radius) * 1000,
            }
            this.setState({
                place: place
            })
        }
    }

    render() {
        const   id_             = this.props.id_
        const   content_id      = "content"     + id_
        const   location_id     = "location"    + id_
        const   engagement_id   = "engagement"  + id_

        const   content     = <div className="p-0 m-0">
            <div className="form-group row p-0 m-0">
                    <label className="col-3 col-form-label p-0 mx-1 my-auto" htmlFor={"type"+content_id} ><small>Showing</small></label>
                    <div className="col-8 p-0 m-0">
                        <select className="form-control mx-1 my-1" 
                            value={this.state.type_}
                            onChange    = {(e)=>this.onChange("type_",e.target.value)}
                            id={"type"+content_id} 
                            name={"type"+content_id}>
                            <option value="ALL">All tweets</option>
                            <option value="RECENT">Recent tweets</option>
                            <option value="POPULAR">Popular tweets</option>
                        </select>
                    </div>
            </div>
            <div className="form-group row p-0 m-0">
                    <label className="col-3 col-form-label p-0 mx-1 my-auto" htmlFor={"language"+content_id} ><small>Language</small></label>
                    <div className="col-8 p-0 m-0">
                        <select className="form-control mx-1 my-1" id={"language"+content_id}
                            value   = {this.state.language} 
                            onChange    = {(e)=>this.onChange("language",e.target.value)}
                            name={"language"+content_id}>
                            <option value="NY">Any Language</option>
                            <option value="AF">Afrikaans</option>
                            <option value="SQ">Albanian</option>
                            <option value="AR">Arabic</option>
                            <option value="HY">Armenian</option>
                            <option value="EU">Basque</option>
                            <option value="BN">Bengali</option>
                            <option value="BG">Bulgarian</option>
                            <option value="CA">Catalan</option>
                            <option value="KM">Cambodian</option>
                            <option value="ZH">Chinese (Mandarin)</option>
                            <option value="HR">Croatian</option>
                            <option value="CS">Czech</option>
                            <option value="DA">Danish</option>
                            <option value="NL">Dutch</option>
                            <option value="EN">English</option>
                            <option value="ET">Estonian</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finnish</option>
                            <option value="FR">French</option>
                            <option value="KA">Georgian</option>
                            <option value="DE">German</option>
                            <option value="EL">Greek</option>
                            <option value="GU">Gujarati</option>
                            <option value="HE">Hebrew</option>
                            <option value="HI">Hindi</option>
                            <option value="HU">Hungarian</option>
                            <option value="IS">Icelandic</option>
                            <option value="ID">Indonesian</option>
                            <option value="GA">Irish</option>
                            <option value="IT">Italian</option>
                            <option value="JA">Japanese</option>
                            <option value="JW">Javanese</option>
                            <option value="KO">Korean</option>
                            <option value="LA">Latin</option>
                            <option value="LV">Latvian</option>
                            <option value="LT">Lithuanian</option>
                            <option value="MK">Macedonian</option>
                            <option value="MS">Malay</option>
                            <option value="ML">Malayalam</option>
                            <option value="MT">Maltese</option>
                            <option value="MI">Maori</option>
                            <option value="MR">Marathi</option>
                            <option value="MN">Mongolian</option>
                            <option value="NE">Nepali</option>
                            <option value="NO">Norwegian</option>
                            <option value="FA">Persian</option>
                            <option value="PL">Polish</option>
                            <option value="PT">Portuguese</option>
                            <option value="PA">Punjabi</option>
                            <option value="QU">Quechua</option>
                            <option value="RO">Romanian</option>
                            <option value="RU">Russian</option>
                            <option value="SM">Samoan</option>
                            <option value="SR">Serbian</option>
                            <option value="SK">Slovak</option>
                            <option value="SL">Slovenian</option>
                            <option value="ES">Spanish</option>
                            <option value="SW">Swahili</option>
                            <option value="SV">Swedish </option>
                            <option value="TA">Tamil</option>
                            <option value="TT">Tatar</option>
                            <option value="TE">Telugu</option>
                            <option value="TH">Thai</option>
                            <option value="BO">Tibetan</option>
                            <option value="TO">Tonga</option>
                            <option value="TR">Turkish</option>
                            <option value="UK">Ukrainian</option>
                            <option value="UR">Urdu</option>
                            <option value="UZ">Uzbek</option>
                            <option value="VI">Vietnamese</option>
                            <option value="CY">Welsh</option>
                            <option value="XH">Xhosa</option>
                        </select>
                    </div>
            </div>
        </div>  
        const   location    = <div className="p-0 m-0">
            <div className="form-group row">
                <Map
                        googleMapURL    = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBF8GocK_UlMewvjkyrftsHsSEqABBduxo"
                        loadingElement  = {<div style={{ height: `300px` ,width:"100%"}} />}
                        containerElement= {<div style={{ height: `300px` ,width:"100%"}} />}
                        mapElement      = {<div style={{ height: `300px` ,width:"100%"}} />}
                        updateInputs    = {this.updateInputs}
                        place           = {this.state.place}
                    />
            </div>
            <div className="form-group row p-0 m-0">
                <label className="col-1 col-form-label p-0 mx-1 my-auto" htmlFor={"lng"+location_id} ><small>Lng</small></label>
                <input type="text" className="col-2 p-0 mx-0 my-1" id={"lng"+location_id} name={"lng"+location_id} 
                    value={this.state.lng} onChange={(e)=>this.onChange("lng",e.target.value)}/>

                <label className="col-1 col-form-label p-0 mx-1 my-auto" htmlFor={"lat"+location_id} ><small>Lat</small></label>
                <input type="text" className="col-2 p-0 mx-0 my-1" id={"lat"+location_id} name={"lat"+location_id}
                    value={this.state.lat} onChange={(e)=>this.onChange("lat",e.target.value)}/>

                <label className="col-1 col-form-label p-0 mx-1 my-auto" htmlFor={"rad"+location_id} ><small>R</small></label>
                <input type="number" className="col-2 p-0 mx-0 my-1" id={"rad"+location_id} name={"rad"+location_id} 
                    value={this.state.radius} onChange={(e)=>this.onChange("radius",e.target.value)}/>
                <label className="col-1 col-form-label p-0 mx-1 my-auto" htmlFor={"rad"+location_id} ><small>KM</small></label>
            </div>
        </div>
        const   engagement  = <div className="p-0 m-0">
            <div className="form-group row p-0 m-0">
                <label  
                        className   = "col-2 col-form-label p-0 mx-1 my-auto"
                        htmlFor     = {"retweets"+location_id} >
                            <small>At Least</small>
                </label>
                <input 
                        type        = "text" 
                        className   = "col-2 p-0 mx-0 my-1" 
                        id          = {"retweets"+location_id} 
                        name        = {"retweets"+location_id} 
                        value       = {this.state.tweets}
                        onChange    = {(e)=>this.onChange("retweets",e.target.value)}/>
                <div className="col-1 p-0 mx-0 my-1">
                </div>
                <div className="col-2  p-0 mx-0 my-auto">
                    <svg className="ml-2 mr-2" style={{width:"20px",height:"20px"}} viewBox="0 0 24 24"><g><path style={{fill: "#BDC3C7"}} d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                </div>
                <div className="col-3 p-0 mx-0 my-auto">
                    <small>Retweets</small>
                </div>
            </div>
            <div className="form-group row p-0 m-0">
                <label  
                        className   = "col-2 col-form-label p-0 mx-1 my-auto"
                        htmlFor     = {"favorites"+location_id} >
                            <small>At Least</small>
                </label>
                <input 
                        type        = "text" 
                        className   = "col-2 p-0 mx-0 my-1" 
                        id          = {"favorites"+location_id} 
                        name        = {"favorites"+location_id} 
                        value       = {this.state.tweets}
                        onChange    = {(e)=>this.onChange("favorites",e.target.value)}/>
                <div className="col-1 p-0 mx-0 my-1">
                </div>
                <div className="col-2  p-0 mx-0 my-auto">
                    <svg viewBox="0 0 24 24" style={{width:"20px",height:"20px"}} className="ml-2 mr-2"><g><path style={{fill: "#BDC3C7"}} d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                </div>
                <div className="col-3 p-0 mx-0 my-auto">
                    <small>Favorites</small>
                </div>
            </div>
        </div>

        return (
            <div    id  = {"accordion"+ id_}>
                <div className="card">
                    <div    className = "card-header p-0"
                            id        = {"h1"+content_id}>
                        <div>
                            <a  className       = "collapsed card-link"
                                data-toggle     = "collapse"
                                aria-expanded   = "false" 
                                href            = {"#"+content_id}>
                                <FormatQuoteRoundedIcon className="float-left my-auto"/>
                                <div className="ml-2 float-left my-auto" >Tweet content</div>
                                <KeyboardArrowDownRoundedIcon className="chev-d float-right my-auto"/>
                                <KeyboardArrowUpRoundedIcon className="chev-u float-right my-auto"/>
                            </a>
                        </div>
                    </div>
                    <div    className       = "collapse p-0 m-0"
                            data-parent     = {"#accordion"+ id_}
                            id              = {content_id}>
                        <div className="card-body p-0 m-0">
                            {content}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div    className = "card-header p-0"
                            id        = {"h1"+location_id}>
                        <div>
                            <a  className       = "collapsed card-link"
                                data-toggle     = "collapse"
                                aria-expanded   = "false" 
                                href            = {"#"+location_id}>
                                <LocationOnRoundedIcon className="float-left  my-auto"/>
                                <div className="ml-2 float-left  my-auto" >Location</div>
                                <KeyboardArrowDownRoundedIcon className="chev-d float-right  my-auto"/>
                                <KeyboardArrowUpRoundedIcon className="chev-u float-right  my-auto"/>
                            </a>
                        </div>
                    </div>
                    <div    className       = "collapse p-0 m-0"
                            data-parent     = {"#accordion"+ id_}
                            id              = {location_id}>
                        <div className="card-body p-0 m-0">
                            {location}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div    className = "card-header p-0"
                            id        = {"h1"+engagement_id}>
                        <div>
                            <a  className       = "collapsed card-link"
                                data-toggle     = "collapse"
                                aria-expanded   = "false" 
                                href            = {"#"+engagement_id}>
                                <FavoriteBorderRoundedIcon className="float-left my-auto"/>
                                <div className="ml-2 float-left my-auto" >Engagement</div>
                                <KeyboardArrowDownRoundedIcon className="chev-d float-right  my-auto"/>
                                <KeyboardArrowUpRoundedIcon className="chev-u float-right  my-auto"/>
                            </a>
                        </div>
                    </div>
                    <div    className       = "collapse p-0 m-0"
                            data-parent     = {"#accordion"+ id_}
                            id              = {engagement_id}>
                        <div className="card-body p-0 m-0">
                            {engagement}
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
