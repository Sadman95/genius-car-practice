import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const LoadOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/user/cart')
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [])

    //remove from cart:
  const removeService = (id) =>{
    axios.delete(`http://localhost:5000/user/cart/${id}`)
    .then(res => {
        if(res.data.deletedCount === 1){
            alert('Your service is deleted successfully');
        }
    })
    .finally(() =>{
        const restOrders = orders.filter(order => order._id !== id);
        setOrders(restOrders);
    })
  }

    return (
        <Row>
            <Row className='text-primary'>
                    <Col><h3>Name</h3></Col>
                    <Col><h3>Quantity</h3></Col>
                    <Col><h3>Price($)</h3></Col>
                    <Col><h3>Action</h3></Col>
                </Row>
            {
                orders.map(order => <Row key={order._id}>
                    <Col>
                        <h4>{order.name}</h4>
                    </Col>
                    <Col>
                        <h4>{order.quantity}</h4>
                    </Col>
                    <Col>
                        <h4>{order.price}</h4>
                    </Col>
                    <Col>
                        <button onClick={() => removeService(order._id)} className="mt-2 btn btn-danger text-light">Delete</button>
                    </Col>
                </Row>)
            }
        </Row>

    );
};

export default LoadOrders;