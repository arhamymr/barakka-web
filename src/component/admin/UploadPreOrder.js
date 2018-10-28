import React, { Component } from 'react'
import * as firebase from 'firebase'
import Progress from 'react-progressbar'

export default class UploadPreOrder extends Component {
	constructor(props) {
	  super(props)
		this.uploadPreOrder = this.uploadPreOrder.bind(this)
		this.uploadImage = this.uploadImage.bind(this)
		this.inputDataOrder = this.inputDataOrder.bind(this)
		this.database = firebase.database()
		this.storage = firebase.storage()
	  this.state = {
	  	title :'',
	  	pathImage : '',
			harga : '',
			desc : '',
			expireDate : '',
			// upload storage
			file_upload : '',
			message : '',
			file_name : '',
			uploading : false,
			percentage_upload : '',
			previewState : false 
	  };
	}

	uploadPreOrder(e) {
		e.preventDefault()
		let that = this
    let metadata = {
      'contentType' : this.state.file_upload.type
    }

    // ini bagian database image storage
    const rootStorageRef = this.storage.ref()
    const orderRef = rootStorageRef.child('preOrder/'+ new Date().getTime() +  this.state.file_upload.name)
    const task = orderRef.put(this.state.file_upload,metadata)
		
    if ( this.state.file_upload.type === 'image/png' || 
        this.state.file_upload.type === 'image/jpeg'){
      task.on('state_changed',
    (snapshot) => {
      let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
			that.setState({percentage_upload: percentage})
      switch(snapshot.state){
        case firebase.storage.TaskState.PAUSED:
          console.log('upload Paused')
					break
					case firebase.storage.TaskState.SUCCESS:
          console.log('upload Success')
					break
        case firebase.storage.TaskState.RUNNING:
          that.setState({uploading:true})
          console.log('upload is running')
          break
      }
    },
    function error(err){
      switch (err.code) {
        case 'storage/unauthorized':
        // user don't have permission to access the object 
          console.log('please login dulu ')
          break;
          case 'storage/canceled':
        // user canceled the upload 
          console.log('cancel ')
          break;
          case 'storage/unknown':
        // unknow error occured , inspct error
          console.log('unknow')
          break;
      }
    },
    function(){
      that.setState({message:'upload complete'})
			that.setState({pathImage : task.snapshot.downloadURL})
			
			let title = that.state.title
			let pathImage =that.state.pathImage
			let harga = that.state.harga
			let desc = that.state.desc
			let expireDate = that.state.expireDate
			
      let rootRef = that.database.ref()
			let preOrderRef = rootRef.child('preOrder')
			
			preOrderRef
				.push().set({
					'title' : title,
					'pathImage': pathImage,
					'harga' : harga,
					'description' : desc,
					'expireDate' : expireDate
				})
    	}
    )
    } else {
      console.log('cancel upload')
      this.setState({message: 'upload failed please choose image file ',previewState:false})
      task.cancel()
    }

	}

	uploadImage(e){
    let file = e.target.files[0]
    let reader = new FileReader();
    
    this.setState(
      {
        file_upload : file,
        file_name : file.name,
        previewState : true
       
    })

    reader.onloadend = () => {
      this.setState({
        imagePreview : reader.result
      })
    }

    reader.readAsDataURL(file)
	}
	
	inputDataOrder(e){
    e.preventDefault() 
    let name = e.target.name 
    this.setState({[name]:e.target.value})
  }

	

	render() {
		return (

			<div className="container">
				<h1> Upload Pre#Order </h1> 
			  <div className="form-group">
			    <label htmlFor="title"> Title Event </label>
			    <input onChange={this.inputDataOrder} name="title" type="text" className="form-control"  placeholder="judul event pre order " />
			  </div>

			  <div className="form-group">
			    <label htmlFor="harga"> Harga  </label>
			    <input type="number" name="harga" onChange={this.inputDataOrder}  className="form-control"  placeholder="harga " />
			  </div>

				<div className="form-group">
			    <label htmlFor="harga"> Expire Until  </label>
			    <input type="date" name="expireDate" onChange={this.inputDataOrder}  className="form-control"  placeholder="masukkan tanggal berakhirnya event ... " />
			  </div>

				<div className="form-group">
			    <label htmlFor="desc"> Description  </label>
			    <textarea name="desc" onChange={this.inputDataOrder} 
					 className="form-control" 
					 placeholder="masukkan descripsi ..." >
						</textarea>
			  </div>


			  <div className="form-group">
			    <label htmlFor="uploadDesign"> Upload Design </label>
			    <input 
			    type="file"

					onChange={this.uploadImage}
			    name="uploadDesign"
					accept="image/*" 
			    className="form-control-file" />
			  </div>
				{
					this.state.previewState ? 
					<img src={this.state.imagePreview} alt="preorder" />
					:
					null
				}
				{ this.state.uploading ? 
          <div> 
          <Progress completed={this.state.percentage_upload} /> <p> {this.state.message}</p> 
          </div> 
          :
           null}


			   <div className="form-group">
			    <button onClick={this.uploadPreOrder} className="btn btn-outline-danger" >Upload
			   </button>
			  </div>
	
			</div>

			
		)
	}
}