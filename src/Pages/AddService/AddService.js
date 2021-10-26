import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";


const AddService = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
      axios.post('http://localhost:5000/services', data)
      .then(res => {
          if(res.data.insertedId){
              alert('Service added successfully');
              reset({});
          }
      })
  };
  return (
    <div>
      <h1>Add a service</h1>
      <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit(onSubmit)}>
        <input className='w-50 mb-2'
          {...register("name", { required: true, maxLength: 20 })}
          placeholder="Name"
        />
        <textarea className='w-50 mb-2' {...register("description")} placeholder="Description" />
        <input className='w-50 mb-2' type="number" {...register("price")} placeholder="Price" />
        <input className='w-50 mb-2' {...register("img")} placeholder="Image URL" />
        <input type="submit" />
      </form>
      </div>
  );
};

export default AddService;
