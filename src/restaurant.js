import React, {Fragment, Component} from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import data from './data.json';

var cuisines = [];
var count=0;
class Restaurant extends Component{

    constructor(props) {
        super();
        this.state= {
            allData: data,
            data: data
        }
    }

    handleFilter = (e) => {
        let data = this.state.allData.filter((val)=> {
            if (val.Cuisines.includes(e.target.value)) {
                return val;
            }
        })
        this.setState({data: data});
    }

    handleSort = (e) => {
        if ( e.target.value === 'rating' ) {
            let data = this.state.allData.sort(function(a, b){return b["Aggregate rating"] - a["Aggregate rating"]});
            this.setState({data: data});
        }
        if ( e.target.value === 'votes' ) {
            let data = this.state.allData.sort(function(a, b){return b.Votes - a.Votes});
            this.setState({data: data});
        }
        if ( e.target.value === 'cost' ) {
            let data = this.state.allData.sort(function(a, b){return b["Average Cost for two"] - a["Average Cost for two"]});
            this.setState({data: data});
        }
    }

    handleSearch = (e) => {
        let data = this.state.allData.filter(val => {
            if ( val["Restaurant Name"].toLowerCase().includes(e.target.value.toLowerCase()) ) {
                return val;
            }
        })
        this.setState({data: data});
    }

    render(){                    
        this.state.data.map(alldata => {
            
            let tempCuisines=alldata.Cuisines.split(',')
            for(let i=0; i<tempCuisines.length; i++){
                cuisines[count]=tempCuisines[i];
                count++;
            }
            
        })
            
        cuisines = Array.from(new Set(cuisines))
            
        return(
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="searchBox col-md-6 col-sm-12">
                            <label>Search: </label>
                            <input type="search" onKeyDownCapture={this.handleSearch} />
                        </div>
                        <div className="filter col-md-3 col-sm-6">
                            <label>Filter: </label>
                            <select onChange={this.handleFilter}>
                                <option value="" className="selected">Select</option>

                                {
                                    cuisines.map((val, key) => {
                                        if(val!=='' || val!==null || val!==' ' || val!==undefined){
                                        return    <option value={val} key={key}>{val}</option>
                                        }
                                        
                                    }
                                    )
                                }
                            </select>
                        </div>
                        <div className="sort col-md-3 col-sm-6">
                            <label>Sortby: </label>
                            <select onChange={this.handleSort}>
                                <option value="" className="selected">Select</option>
                                <option value="rating" >Rating</option>
                                <option value="votes" >Votes</option>
                                <option value="cost" >Cost</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.state.data.map((val, key) => (
                                <div className="col-md-3 col-sm-6 col-xs-12" key={key}>
                                    <section className="section-wrapper" data-id={val["Restaurant ID"]}>
                                        <a className="inner-wrapper"><div height="100%" width="100%" className="inner-container   innerSec"><div src="" className="restro"></div><img alt={val["Restaurant Name"]} src="https://dummyimage.com/wqxga" loading="lazy" className="inner-img" /></div><section className="inner-restro-sec"></section><section className="agg-rating"><span style={{backgroundColor: val["Rating color"]}} className=" agg-rating-background">{val["Aggregate rating"]}</span></section></a><div className="restro-name"><a  title={val["Restaurant Name"]} className="restro-text">{val["Restaurant Name"]}</a><div className=" inner-restro-section"><a  title={val['Average Cost for two']} color="" className="  inner-wrapper-text">{'Cost for two: '+val['Average Cost for two']}</a></div><div className=" inner-restro-section"><a title={val.Cuisines} color="" className="  inner-wrapper-text">{val.Cuisines}</a></div>
                                        <div className=" inner-restro-section"><a title={val.Currency} color="" className="  inner-wrapper-text">{'Currency: '+val.Currency}</a></div>
                                        <div className=" inner-restro-section"><a title={val["Has Table booking"]} color="" className="  inner-wrapper-text">{'Table Booking: '+val["Has Table booking"]}</a></div>
                                        <div className=" inner-restro-section"><a title={val["Has Online delivery"]} color="" className="  inner-wrapper-text">{'Online Delivery: '+val["Has Online delivery"]}</a></div>
                                        <div className=" inner-restro-section">Rating: <a title={val["Rating text"]} style={{color: (val["Rating color"]).replace(' ', '').toLowerCase()}} className="  inner-wrapper-text">{val["Rating text"]}</a></div>
                                        <div className=" inner-restro-section"><a title={val.Votes} color="" className="  inner-wrapper-text">{'Votes: '+val.Votes}</a></div></div></section>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Restaurant;