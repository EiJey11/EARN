import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './MainNav.css'
import './MainNav.scss'
import Logo from "./images/LOGO.png";
import { Offline, Online } from "react-detect-offline";

import {useStates} from './utilities/states';
//import ShoppingCart from './ShoppingCart';

export default function MainNav() {

  let s = useStates('main');

  //let totalNumberOfProductsInCart = s.cartContents.reduce((acc,{quantity}) => acc + quantity,0);

  let totalNumberOfProductsInCart = 0;
  // loop through each row in the shopping cart
  // add the quantity per row to totalNumberOfProductsInCart
  for(let cartRow of s.cartContents){
    totalNumberOfProductsInCart += cartRow.quantity;
    console.log('name',cartRow.product.name,'quantity', cartRow.quantity, 'totalNumber...',totalNumberOfProductsInCart)
  }
  

  // React Router DOM v6 got rid of the NavLink component
  // What is the smartest way to recreate that functionality
  // (adding an active CSS class to the active menu choice)

  return <Navbar className="navbar" variant="light" expand="lg" fixed="top" >
      <div className='statusBar'>
        <Online>🟢</Online>
        <Offline>🔴</Offline>
      </div>
            <Navbar.Brand className="logo_text" href="#"><img src={Logo} style={{ height: 90 }} alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link hem" to="/">HEM</Link>
                <Link className="nav-link products" to="/product-list">PRODUKTER</Link>
                <Link className="nav-link products" to="/backoffice">BACKOFFICE</Link>
                <Link className="nav-link" to="/shopping-cart"><button className="btn_cart">🛒 {totalNumberOfProductsInCart}</button></Link>
                <Link className="nav-link" to="/login"><button className="btn_login"> Login</button></Link>
              </Nav>
            </Navbar.Collapse>
         </Navbar>
}

