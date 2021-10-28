import React, { useEffect, useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";

const UpdateService = () => {
  const { id } = useParams();
  const [service, setService] = useState({});


  useEffect(() => {
    fetch(`https://afternoon-citadel-30543.herokuapp.com/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
  }, [id]);

  //name change:
  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const updatedService = {
      name: updatedName,
      description: service.description,
      price: service.price,
      img: service.img,
    };
    setService(updatedService);
  };

  //name change:
  const handleImgChange = (e) => {
    const updatedImg = e.target.value;
    const updatedService = {
      name: service.name,
      description: service.description,
      price: service.price,
      img: updatedImg,
    };
    setService(updatedService);
  };

  //name change:
  const handleDesChange = (e) => {
    const updatedDesc = e.target.value;
    const updatedService = {
      name: service.name,
      description: updatedDesc,
      price: service.price,
      img: service.img,
    };
    setService(updatedService);
  };

  //name change:
  const handlePriceChange = (e) => {
    const updatedPrice = e.target.value;
    const updatedService = {
      name: service.name,
      description: service.description,
      price: updatedPrice,
      img: service.img,
    };
    setService(updatedService);
  };

  //update handler:
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://afternoon-citadel-30543.herokuapp.com/services/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
          if(data.modifiedCount === 1){
              alert('Service is updated successfully');
              e.target.reset();
          }
      })
  };

  return (
    <div>
      <h1 className="mb-4">Update service id: {id}</h1>
      <div className="w-50 m-auto">
        <Form onSubmit={handleUpdate}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={handleNameChange}
                value={service.name || ""}
                type="text"
                placeholder="Update Name"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={handleDesChange}
                value={service.description || ""}
                type="text"
                placeholder="Update Description"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={handlePriceChange}
                value={service.price || ""}
                type="number"
                placeholder="Update Price"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Image URL
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={handleImgChange}
                value={service.img || ""}
                type="text"
                placeholder="Update Image URL"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="warning">
                Update
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default UpdateService;
