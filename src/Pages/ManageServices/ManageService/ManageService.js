import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageService = ({ service }) => {
  const { _id, name, description, price, img } = service;

  const [services, setServices] = useState([]);

  useEffect(() =>{
      fetch('http://localhost:5000/services')
      .then(res => res.json())
      .then(data => setServices(data))
  }, [])

  //delete handler:
    const handleDelete = id =>{
        fetch(`http://localhost:5000/services/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount === 1){
                window.confirm('Are you confirm to delete?');
                const restServices = services.filter(service => service._id !== id);
                setServices(restServices)
                window.location.reload();
            }
        })
    }

  return (
    <Col>
      <Card>
        <Card.Img
          className="w-75 m-auto rounded-3 mt-3"
          variant="top"
          src={img}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h3 className="text-muted">${price}</h3>
          <ButtonGroup aria-label="Basic example">
            <Link to={`/services/updateService/${_id}`}>
                <Button variant="success">Update</Button>
            </Link>
            <Button onClick={() => handleDelete(_id)} variant="danger">Delete</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ManageService;
