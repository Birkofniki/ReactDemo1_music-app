import React from "react";
import "./Track.css";

class Track extends React.Element{
    constructor(props) {
      super(props); //A constructor passing props to the super class constructor

      this.addTrack= this.addTrack.bind(this);
      this.removeTrack= this.removeTrack.bind(this);  
    }

    {/*end of creating the Track Functions, Now I define each below*/}

    addTrack(event){
        this.props.onAdd(this.props.track);
    }

    removeTrack(event){
        this.props.onRemove(this.state.track);
    }

    //closing button action
    renderAction(){
        if(this.props.isRemoval){
            return(
                <button className="Track-action" onclick={this.removeTrack}> - </button> // the - is for track removing button
            );
        }
        return(
            <button className="Track-action" onclick={this.addTrack}> + </button> // the + is for track addition button
        );
    }

    render(){
        return(
            <div className= "Track">
                <div className="Track-information">
                    <h3> {this.props.track.name} </h3>
                    <p> {this.props.track.artist} | {this.props.track.album} </p>

                    <iframe
                        src={"https://open.spotify.com/embed/track/" + this.props.track.id}
                        width= "300"
                        height= "80"
                        frameborder= "0"
                        allowtransparency= "true"
                        allow="encrypted-media"
                        title="preview"
                        > </iframe>
                </div>
                {this.renderAction()} {/*This will give us the + and - button in this component*/}

            </div>
        );
    }
}

export default Track;