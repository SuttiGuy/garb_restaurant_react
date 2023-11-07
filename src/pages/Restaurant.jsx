import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import Card from "../components/Card";
import authHeader from "../services/auth.header";
import Loading from "../components/loading";
import * as loadingData from "../loading/restaurant.json"
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
  headers:authHeader(),
};

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get(`${URL}/restaurant`, config);
        setRestaurants(res.data);
        setloading(false)
      } catch (error) {

      }
    };
    setloading(true)
    fetchAllRestaurants();
  }, []);


   const handleDelect = async (id) => {
   

    try {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

        await axios.delete(`${URL}/restaurant/${id}` , config);
        window.location.reload()
    } catch (error) {
        console.error(error);
    }
   }


   
  

  return (
    <div>
  
      <h1>Restaurant</h1>
      <div className="row">
        {
          !loading ? ( <div className="restaurants">
          {restaurants.map((restaurant) => {
            return (
                <Card restaurant={restaurant}
                handleDelete={handleDelect} 
                key={restaurant.id} 
                 />
            );
          })};
        </div>) : (<Loading animation={loadingData}/>)
        }
       
      </div>
    </div>
  );
};

export default Restaurant;
