import React, { Component } from 'react'

import Footer from "./component/Footer"
import Product from "./component/product/"
import Pricing from "./component/Pricing"
import Gallery from "./component/Gallery"
import Navigation from './component/Nav'
import Header from './component/Header'

import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB3XnjOOjgkZLC8-NRKYIHm0xzz2_9SOiM",
    authDomain: "barakka-c80e3.firebaseapp.com",
    storageBucket: "barakka-c80e3.appspot.com",
    projectId: "barakka-c80e3",
    databaseURL: "https://barakka-c80e3.firebaseio.com",
};
firebase.initializeApp(config);

export default class App extends Component {


  render() {
    return (
      <div>
        <Navigation  titlePage="Home"/>
        <Header />
        <div className="container">
          <Product />
          <Gallery />
          <Pricing />
        </div>
        <Footer />
      </div>
      
    );
  }
}


