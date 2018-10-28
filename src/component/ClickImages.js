import React, { Component } from 'react'
import Close from 'react-icons/lib/fa/close'


export default class ClickImages extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            name : props.name,
            image : props.imgSrc,
            desc : props.desc,
            contact : props.contact,

            lokasi : props.lokasi,
            description : props.desc,
            
        }
    }   
	render() {
        console.log(this.state)
        if (!this.props.show){
            console.log("modal not show")
            return null
        }
        console.log("modal show")
		return (
            <div className="backdrop">
                <div className="row" >
                    <div className="col-md-8 img-modal">
                        <img src={this.state.image} alt="gambar" />
                    </div>
                    <div className="col-md-4 modal-desc">
                        <Close 
                        onClick={this.props.onClose} 
                        className="close-modal" />
                        <h1> {this.state.name} </h1>
                        <p> {this.state.contact}</p>
                        <p> lokasi : {this.state.lokasi} </p>

                    </div>
                </div>
            </div>
		)
	}
}