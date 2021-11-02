import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import './Booking.css'

const Booking = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  const [count, setCount] = useState(1);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch(`https://afternoon-citadel-30543.herokuapp.com/services/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);

  //count state:
  const handleAdd = () =>{
      setCount(count + 1);
  }
  
  const handleRemove = () =>{
      count > 1 && setCount(count - 1);
  }

  //add to cart:
  const addToCart = () =>{
    const item = {
      name: service.name,
      price: service.price,
      quantity: count
    }
    fetch('http://localhost:5000/user/cart', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item) 
    })
    .then(res => {
      if(res.status){
        Swal.fire(
          'Well Done!',
          'Service added to cart!',
          'success'
        )
      }
    })
    .finally(() => setToggle(true));
  }




  return (
    <Row className='p-4'>
      <Col xs={12} md={8}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-7 d-flex flex-start">
              <img
                src={service.img}
                className="img-fluid h-100 rounded-start"
                alt="..."
              />
            </div>
            <div className="col-5">
              <div className="card-body text-start">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <div className="card-text">
                  <h3 className="text-muted">${service.price * count}</h3>
                  <Button onClick={handleAdd} variant="primary">+</Button>
                  <span className='mx-2'>{count}</span>
                  <Button onClick={handleRemove} variant="danger">-</Button>
                </div>
                {
                  !toggle ? <button onClick={addToCart} className="mt-2 btn btn-success text-light">Add to cart</button> :
                  <Link to='/myOrders'>
                    <button className="mt-2 btn btn-secondary text-light">Check your orders</button>
                  </Link>
                }
                
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={6} md={4}>
        <h2>Cart</h2>
      </Col>
    </Row>
  );
};

export default Booking;
