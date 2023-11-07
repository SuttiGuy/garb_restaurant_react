import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";
// import authHeader from "../services/auth.header";
import Loading from "../components/loading";
import * as loadingData from "../loading/restaurant.json"
import Swal from 'sweetalert2'

const Update = () => {
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    img: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const {restaurantId} = useParams();

  const handleChange = (e) => {
    setRestaurants((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

  useEffect(() => {
    const fetchAllRestaurants = async () => {
        try {
            const res = await axios.get(
                `/restaurant/${restaurantId}` );
            setRestaurants(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchAllRestaurants();
  }, [restaurantId]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {



      await axios.put(`/restaurant/${restaurantId}`, restaurant);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="container">
      <h1>Grab Restaurant</h1>
      <div className="row form">
        <div className="col-6 justify-cintent-center">
          <h5 className="card-header"> Add New Restaurant</h5>
          <div className="error">{error && "Something went wrong !!"}</div>
          <div className="card-body">
            <form>
              <div className="from-group">
                <label htmlFor="name">Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Restaurant name"
                  onChange={handleChange}
                  value={restaurant.name}
                />
              </div>

              <div className="from-group">
                <label htmlFor="name">Restaurant type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Restaurant type"
                  onChange={handleChange}
                  value={restaurant.type}
                />
              </div>

              <div className="from-group">
                <label htmlFor="name">Restaurant img</label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  placeholder="Restaurant img"
                  onChange={handleChange}
                  value={restaurant.img}
                />
              </div>

              <Link to="" className="btn btn-warning" onClick={handleClick}>
                Update
              </Link>
              {""}
              <Link to="/" className="btn btn-danger" >
                Cancle
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
