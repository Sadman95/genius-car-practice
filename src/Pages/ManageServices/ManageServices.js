import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ManageService from './ManageService/ManageService';

const ManageServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    return (
        <>
            <div className='row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4 p-4'>
                {
                    services.map(service => <ManageService key={service._id} service={service}></ManageService>)
                }

            </div>
            <Link to='/addService'><Button className='mb-4' variant='primary'>Add Service</Button></Link>
        </>
    );
};

export default ManageServices;