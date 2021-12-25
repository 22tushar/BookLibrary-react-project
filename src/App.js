import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BookCard from './component/BookCard.js'
import { Route, Routes } from "react-router-dom";
// import ReactDOM from "react-dom";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from "react-router-dom";
// import { Button ,FormControl} from '@material-ui/core';
// import { CartProvider, useCart } from "react-use-cart";
// import Favourites from './component/favourites.js'
import { Link } from 'react-router-dom'
import {
  InputGroup,

  Button,
  Spinner,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import Favourites from './component/favourites.js';
import GoogleBook from './component/GoogleBook.js';

export const BookContext = React.createContext();
function App() {

  const [favourite, setfavourite] = useState([]);

  return (
    <BookContext.Provider value={[favourite, setfavourite]} >
      <Routes>
        <Route path="/favourites" element={<Favourites value={favourite} />} />
        <Route path="/" element={<GoogleBook size={favourite.length} />} />
      </Routes>
    </BookContext.Provider>
  )
}

export default App;



