import React from "react";
import "./searchBar.css";

class searchBar extends React.Element{
    constructor(props) {
      super(props)
    
      this.state = {
         term:""
      }; //A constructor passing props to the super class constructor
      this.handleTermChange= this.handleTermChange.bind(this);
      this.search= this.search.bind(this);
      this.handleEnter = this.handleEnter.bind(this);      

    }
    /*end of creating the searchBar Functions, Now I define each below*/

    handleTermChange(event){
        this.setState({term:event.target.value});
    }
    search(){
        this.props.onSearch(this.state.term);
    }
    handleEnter(event){
        if(event.keyCode === 13){
            this.search();
        } /*keyCode === 13 is the data that the user enters, e.g here i3 means pressing the enter Key*/
    }


    render(){
        return(
            <div className= "searchBar">
            <input placeholder="Enter Song, album, or artist" onChange={this.handleTermChange} onKeyUp={this.handleEnter} />
            <button className="searchButton" onclick={this.search}>SEARCH </button>
            </div>
        );
    }
}

export default searchBar;