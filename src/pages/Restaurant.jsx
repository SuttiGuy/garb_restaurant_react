import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import Card from "../components/Card";
import authHeader from "../services/auth.header";


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
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get(`${URL}/restaurant`, config);
        setRestaurants(res.data);
      } catch (error) {}
    };
    fetchAllRestaurants();
  }, []);

   const handleDelect = async (id) => {
    try {
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
        <div className="restaurants">
          {restaurants.map((restaurant) => {
            return (
                <Card restaurant={restaurant}
                handleDelete={handleDelect} 
                key={restaurant.id} 
                 />
            );
          })};
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
