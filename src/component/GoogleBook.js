import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BookCard from './BookCard.js';
import { Badge } from '@mui/material';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// import Favourites  from './favourites.js';

// import ReactDOM from "react-dom";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from "react-router-dom";
// import { Button ,FormControl} from '@material-ui/core';
// import { CartProvider, useCart } from "react-use-cart";
// import Favourites from './component/favourites.js'
import { Route, Routes, Link } from 'react-router-dom'
import {
  InputGroup,
  Button,
  Spinner,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import '../App.css';
import Favourites from './favourites.js';

let array;

export const BookContext = React.createContext();
function GoogleBook(props) {


  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [Cards, setCards] = useState([])
  const [Cardsitem, setCardsitem] = useState([]);
  const [toggle, settoggle] = useState(false);


  const handlesubmit = () => {

    setLoading(true);

    if (maxResults > 50 || maxResults < 1) {
      toast.error('max result must be between 1 and 20')
    } else {
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
      ).then(res => {
        if (startIndex >= res.data.totalItems || startIndex < 1) {
          toast.error(
            `max reults must be between 1 and ${res.data.totalItems}`
          );
        } else {
          if (res.data.items.length > 0) {
            setCards(res.data.items);
            setLoading(false);
          }
        }
      }).catch((error) => {
        setLoading(true);
        console.log(error.response)

      })
    }


  };
  const mainHeader = () => {

    return (



      <div>
        <Navbar className='navbar' color='warning' light expand="xl" fixed='top'>
          <NavbarBrand href="/">𝕋𝕌𝕊ℍ𝔸ℝ 𝔹𝕆𝕆𝕂 𝔹𝕆𝕏</NavbarBrand>
          <NavbarToggler onClick={() => settoggle(!toggle)} />
          <Collapse isOpen={toggle} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className='nav-menu'>
                {/* <NavLink href="/">Home</NavLink> */}
                <Link className='nav-link' to='/' >Home</Link>
              </NavItem>
              <NavItem className='nav-menu'>
                {/* <NavLink href="/favourites">Favourite</NavLink> */}

                {/* <MailIcon color="action" /> */}
                <Link className='nav-link' to='/favourites' >
                  <Badge badgeContent={props.size} color="primary">Favourite</Badge></Link>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
        <div className='main-image d-flex justify-content-center align-items-center flex-column'>

          <div className='filter'></div>
          <h1
            className='display-2 text-center text-white mb-3'
            style={{ zIndex: 2 }}
          >
            Google Books
          </h1>

          <div style={{ width: '60%', zIndex: 2 }} >
            <InputGroup size='lg' className='mb-3'>
              <Input placeholder='Book Search' value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button color='warning' onClick={handlesubmit} >
                {/* <i class="bi bi-search"></i> */}
                Search
              </Button>

            </InputGroup>
            <div id='inputs' className='d-flex text-white justify-content-center m-5'>
              <FormGroup  >
                <Label for='maxResults'>Max Results</Label>
                <Input
                  type='number'
                  id='maxResults'
                  placeholder='Max Results'
                  value={maxResults} onChange={(e) => setMaxResults(e.target.value)}
                />
              </FormGroup>
              <FormGroup className='mt-4'>



              </FormGroup>
            </div>

          </div>
        </div>

      </div>
    );
  }



  const handleCards = () => {

    console.log(Cards);
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3' >
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>

      )
    } else {
      const items = Cards.map((item, i) => {
        ''
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className='col-lg-4 mb-3' key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            // onClick={FavCards(item.id)}
            // id={item.id}

            />
          </div>
        )
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>

        </div>
      );

    }
  }




  return (


    <div className='w-100 h-100'>

      {mainHeader()}
      {handleCards()}
      {/* {props.fun(4)} */}
    </div>
  );


}

export default GoogleBook;

