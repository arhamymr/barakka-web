
import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
import url from '../images/logo-barakka-small-black.png'
import '../App.css'
import * as firebase from 'firebase'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this)
    this.state = {
      pageTitle : props.titlePage,
      isAuthenticated : false,
      // user data 
      userName: '',
      email : '',
      photoUrl : null,
      emailVerified : '',
      userId :''
    };
  }

  componentDidMount() {
    

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null ){
        if (user.emailVerified === false){
          user.sendEmailVerification().then(()=>{
            console.log("email sent")
          }).catch((error)=>{
            console.log(error.code)
          }
        )
        }

      }
     
      if (user) {
         this.setState({
          userName : user.displayName,
          email : user.email,
          photoUrl : user.photoURL,
          emailVerified : user.emailVerified,
          uid: user.uid,
          isAuthenticated : true
        })
        
      } else {
        console.log('you are not authenticated')
        this.setState({isAuthenticated : false})
      }
      });


    let user = firebase.auth().currentUser;
    console.log("component will mount hit ")
    console.log(user)
   
  }
  signOut() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('log-out success')
      }).catch(function(error) {
        console.log(error)
      });
    }
  render() {
    console.log("ini bagian photo url",this.state.photoUrl)
    return ( 
      <div>
      { this.state.emailVerified ? null : 
      <div className='email-verified' > 
        <p> 
        Email anda Belum di verfikasi, mohon verfikasi email anda <a> kirim ulang email verfikasi </a> </p>
        
      </div>
      } 
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
             <Link to='/' className="navbar-brand"> <img src={url} id="logo-barakka" alt="logo barkka" />
              <span className="subtitle-logo">{this.state.pageTitle}
              </span>
            
            </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
            </div>
            <form className="form-inline my-2 my-lg-0">
               <Link  to={'/'} className="nav-link"> Home
              </Link>
              <Link  to={'/preOrder'} className="nav-link"> Pre#Order
              </Link>
              { (this.state.isAuthenticated === true ) ?
              <Link to={'/create'} className="nav-link"> Create
              </Link> : null
              }
              { 

                (this.state.isAuthenticated === false)?
                <Link to={'/login'} > <button className='btn btn-outline-danger' > Login </button> 
              </Link>
               : 
               <button className='btn btn-outline-danger' onClick={this.signOut} > Logout </button> 
             }
              <Link  to={'/order'} className="nav-link"> Order Now ! 
              </Link>

              { 
                this.state.isAuthenticated ?
                     <img src={require('../images/pricing/standar.png')} alt="profil picture" style={{width:'50px',height:'50px', borderRadius:'50px'}}/>  
                   :
                   null
              }
              <a className="nav-link">{this.state.userName}
                  </a>
           </form>
          </div>
        </nav>
      </div>
    )
  }
}

