import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import Logo from '../../images/logo-barakka-small-black.png'
import Navigasi from '../Nav'
import * as firebase from 'firebase'
import Progress from 'react-progressbar'

export default class Order extends Component {

  constructor(props) {
    super(props)
    this.database = firebase.database()
    this.storage = firebase.storage()
    this.stateName = this.stateName.bind(this)
    this.stateDetail = this.stateDetail.bind(this)
    this.stateTelepon = this.stateTelepon.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.inputDataOrder = this.inputDataOrder.bind(this)
    this.stateKeteranganTambahan = this.stateKeteranganTambahan.bind(this)
    this.stateLokasi = this.stateLokasi.bind(this)
    this.stateUpload = this.stateUpload.bind(this)
    this.uploadData     = this.uploadData.bind(this)
    this.state = {
      nama:null,
      keterangan :null,
      detailOrder:null,
      telepon :null,
      pathImage :null,
      lokasi : null,
      // ini bagian storage
      file_name : '',
      file_upload : '',
      uploading : false,
      percentage_upload :'',
      message : '',
      imagePreview:'',
      previewState : false,
      // bagian keterangan 
      stateKeterangan : null,
     
  
    }
  }

  componentDidMount(){
    if (this.state.imagePreview != null){
      this.setState({previewState : true})
    }
  }
  
  uploadData(e){
    e.preventDefault()
    let that = this
    let metadata = {
      'contentType' : this.state.file_upload.type
    }
    
  
    const rootStorageRef = this.storage
    const orderRef = rootStorageRef.ref('Order/'+ new Date().getTime() +  this.state.file_upload.name)
    const task = orderRef.put(this.state.file_upload)

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
          console.log("upload success")
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
        // usesr canceled the upload 
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
       // ini bagian databse order 
      let nama = that.state.nama
      let detailOrder = that.state.detailOrder
      let telepon = that.state.telepon
      let pathImage = that.state.pathImage
      let keterangan = that.state.keterangan
      let lokasi = that.state.lokasi
      var rootRef = that.database.ref()
      rootRef.child('Order').push().set({
        'nama' : nama,
        'detailOrder' : detailOrder,
        'telepon' : telepon,
        'keterangan' : keterangan,
        'pathImage' : pathImage,
        'lokasi' : lokasi
      });
    }
    )
    } else {
      console.log('cancel upload')
      this.setState(
        {
          message: 'upload failed please choose image file ',previewState:false,
          valid : "masih ada data yang belum terisi"

        })
      task.cancel()
    }
   

  }

  
  uploadImage(e){
    let file = e.target.files[0]
    let reader = new FileReader()
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

  stateName() {
    this.setState({stateKeterangan : 'nama'})
  }
  stateDetail() {
    this.setState({stateKeterangan : 'detail'})
  }
  stateTelepon() {
    this.setState({stateKeterangan : 'telepon'})
  }
  stateKeteranganTambahan(){
    this.setState({stateKeterangan : 'keterangan'})
  }
  stateLokasi(){
    this.setState({stateKeterangan : 'lokasi'})
  }
  stateUpload(){
    this.setState({stateKeterangan : 'upload'})
  }


 
	render() {
    console.log(this.state)
    console.log(this.state.stateKeterangan)
    console.log(this.state.valid)
    var stateKeterangan
    switch ( this.state.stateKeterangan){

      case null :
      stateKeterangan = 
      <div>
      <p> Isi form di samping untuk memesan orderan </p> 
      </div>
      break
      case 'nama':
      stateKeterangan =  
      <div>
      <h5> nama </h5>
      <p> Masukkan Nama Lengkap </p>
      </div> 
      break;
      case 'detail' :
      stateKeterangan =
      <div>
        <h5> Detail Order</h5>
        <p> Masukkan tipe baju dan jumlah baju yang ingin dipesan di di bagian ini </p>
        <p> contoh : </p>
        <p> [jumlah/qty] [type baju] [ukuran baju] </p> 
        <p> 1 t-shirt S </p> 
        <p> 3 t-shirt M </p>
        <p> 6 raglan L </p>  
      </div>
      break;

      case 'telepon' : 
      stateKeterangan = 
      <div>
      <h5> Kontak</h5>
      <p> Masukkan No telepon / nomor WA(Whatsapp) <br />
      contoh : 085 340 019 *** </p>
      </div>
      break;

      case 'lokasi' :
      stateKeterangan =
       <div>
           <h5> Lokasi </h5>
            <p> Masukkan lokasi </p>
            <p> contoh : <br /> Daeng Tata Raya , Parantambung, Tamalate , kota makassar ,
            Sulawesi Selatan 90245 </p> 
        </div>
      break;

      case 'keterangan':
      stateKeterangan =
      <div>
        <h5> Keterangan </h5>
        <p> Masukkan Keterangan atau informasi tambahan tentang product yang anda pesan </p> 
      </div>
      break;
      
      case 'upload':
      stateKeterangan = 
      <div>
       <h5> Upload  </h5>
      <p> Masukkan Desain Baju yang ingin di buat upload gambar berupa file bitmap (.jpg,.png) </p> 

      </div>
      break;

    }
		return (
      <div>
      <Navigasi /> 
			<div className="container">
			<div className="row">
	
				<div className="col-md-8 container-login">
        <br />
         <br />
          <br />

				  <h1> Form Pemesanan </h1> 
          <form onSubmit={this.uploadData} >
					<div className="form-group">
           		<label htmlFor="nama">Nama </label>
           		<input type="text" onFocus={this.stateName} name="nama" onChange={this.inputDataOrder} className="form-control" placeholder="masukkan nama lengkap" />
         	</div>
           <div className="form-group">
              <label htmlFor="detailOrder"> Detail Order <a data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?"> contoh : </a>  </label>
              <textarea name="detailOrder" onFocus={this.stateDetail} onChange={this.inputDataOrder} className="form-control" placeholder="masukkan detail orderan seperti jumlah orderan, type ... " rows="9" />
          </div>
           <div className="form-group">
              <label htmlFor="number"> No Telepon   </label>
              <input type="text" 
              onFocus={this.stateTelepon}
              name="telepon" 
              onChange={this.inputDataOrder}
              className="form-control" 
              placeholder="masukkan nomor telepon" />
          </div>
          <div className="form-group">
              <label> Masukkan Lokasi </label>
    
              <textarea onFocus={this.stateLokasi} className="form-control" name="lokasi" onChange={this.inputDataOrder} placeholder="ketikkan alamat lengkap " /> 
             
          </div>
          <div className="form-group">
              <label htmlFor="keterangan"> Keterangan Tambahan  </label>
              <textarea onFocus={this.stateKeteranganTambahan} name="keterangan" onChange={this.inputDataOrder} className="form-control" placeholder="masukkan keterangan" />
          </div>

          <div className="form-group">
              <label htmlFor="upload"> Upload Desain (file *.jpn atau *.png) </label>
              <input onFocus={this.stateUpload} type="file" accept="image/*" onChange={this.uploadImage} className="form-control-file" id="file" name="pathImage" />
          </div>

          {

            this.state.previewState ? 
            <img src={this.state.imagePreview} alt="preview image" style={{width:'25%',margin:'10px'}} />
            :
            null
          }
         
          { this.state.uploading ? 
          <div> 
          <Progress completed={this.state.percentage_upload} /> <p> {this.state.message}</p> 
          </div> 
          :
           null}
          <hr />      		
         		<div className="form-group">
          	   	<button type="submit" className="btn btn-outline-danger"> Selanjutnya  </button>
         			  
            </div>
				    </form> 

        </div>
        
				<div className="col-md-4">
         <br />
         <br />
          <br />

          <div className="order-help">
         
            <h4> Keterangan </h4>
            {stateKeterangan}
          </div>
				</div>

        

			</div>
			</div>
      </div>
		)
	}
}