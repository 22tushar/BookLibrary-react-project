// import React from 'react';
// import BookContext from './GoogleBook.js';
import React, { useContext, useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

} from 'reactstrap';
import { Route, Routes, Link } from 'react-router-dom'
import { BookContext } from '../App.js';
import { Badge } from '@mui/material';
const Favourites = ({ value }) => {
  const [favourite, setfavourite] = useContext(BookContext);
  const [modal, setModal] = useState(false);
  const [toggler, settoggler] = useState(false);
  const toggle = () => {
    setModal(!modal);
  }

  const navbar = () => {

    return (

      <Navbar className='navbar' color='warning' light expand="xl" fixed="top">
        <NavbarBrand href="/">𝕋𝕌𝕊ℍ𝔸ℝ 𝔹𝕆𝕆𝕂 𝔹𝕆𝕏</NavbarBrand>
        <NavbarToggler onClick={() => settoggler(!toggler)} />
        <Collapse isOpen={toggler} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className='nav-menu'>
              <Link className='nav-link' to='/' color='white' >Home</Link>
            </NavItem>
            <NavItem className='nav-menu'>
              <Link className='nav-link' to='/favourites' >
                <Badge badgeContent={value.length} color="primary">Favourite</Badge></Link>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
    )
  }

  const favCards = (value) => {
    console.log(value.title)

    const remove = (title) => {
      let hardCopy = [...value];
      hardCopy = hardCopy.filter((cartItem) => cartItem.title !== title);
      setfavourite(hardCopy)
      // console.log(id)
    }




    const items = value.map((item, i) => {
      return <div className='col-lg-4 mb-3' >

        <div className='block'>

          <Card style={{ width: '233px' }} className='m-auto '>
            <CardImg
              top
              style={{ width: '100%', height: '233px' }}
              src={item.thumbnail}
              alt={item.title}
            />
            <CardBody>
              <CardTitle className='card-title'>{item.title}</CardTitle>
              <Button onClick={toggle}>More info</Button>
            </CardBody>
            <CardBody>
              <Button color='danger' onClick={() => remove(item.title)}>Remove</Button>
            </CardBody>


            <Modal isOpen={modal} toggle={toggle}>
              <div className='modal-header d-flex justify-content-center'>
                <h5 className='modal-title text-center' id='exampleModalLabel'>
                  {item.title}
                </h5>
                <button
                  aria-label='Close'
                  className='close'
                  type='button'
                  onClick={toggle}
                >
                  <span aria-hidden={true}>X</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='d-flex justify-content-between ml-3'>
                  <img src={item.thumbnail} alt={item.title} style={{ height: '250px' }} />
                  <div>
                    <p>Page Count: {item.pageCount}</p>
                    <p>Language : {item.language}</p>
                    <p>Authors : {item.authors}</p>
                    <p>Publisher : {item.publisher}</p>
                  </div>
                </div>
                <div className='mt-3'>{item.description}</div>
              </div>
              <div className='modal-footer'>
                <div className='left-silde'>
                  <a
                    href={item.previewLink}
                    className='btn-link'
                    color='default'
                    type='button'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Preview Link
                  </a>
                </div>

                {/* <div className='divider'></div> */}
                <div className='right-silde'>
                  <a
                    href={item.infoLink}
                    className='btn-link'
                    color='default'
                    type='button'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Info Link
                  </a>
                </div>
              </div>
            </Modal>
          </Card>
        </div>

      </div>


    })
    return (

      <div className='container my-5'>
        <div className='row'>{items}</div>
      </div>
    )
  }

  return (
    <div className='w-100 h-100'>

      {navbar()}
      {favCards(value)}
      {/* {props.fun(4)} */}
    </div>


  );
}



export default Favourites