import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from  "../services/api";
import "./sign.css";


const Add = () => {
  const[restaurant, setRestaurants] = useState({
    name:"",
    type:"",
    img:""
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  

  const handleChange = (e) => {
    setRestaurants((prev) => ({...prev, [e.target.name]:e.target.value}));
  }

  const handleClick = async(e) => {
  e.preventDefault();
  try {
    await axios.post(`/restaurant`, restaurant);
    navigate("/");
  } catch (error) {
    console.error(error);
    setError(true);
  }
  }

  const handleClear = (e) => {
    setRestaurant({
      name:"",
      type:"",
      img:""
    });
    setError(false);
    navigate("/")
  }

  return (
    <div className="container">      
      <h1>Grab Restaurant</h1>
      <div className="row form">
      <div className="col-6 justify-cintent-center">
        <h5 className='card-header'> Add New Restaurant</h5>
        <div className="error">{error && "Something went wrong !!"}</div>
        <div className="card-body">
          <form>
            <div className="from-group"  > 
            <label htmlFor="name">Restaurant Name</label>
            <input type="text" className="form-control"
            name="name" placeholder="Restaurant name"
            onChange={handleChange}
            value={restaurant.name}
            />
          </div>

          <div className="from-group"  > 
            <label htmlFor="name">Restaurant type</label>
            <input type="text" className="form-control"
            name="type" placeholder="Restaurant type"
            onChange={handleChange}
            value={restaurant.type}
            />
          </div>

          <div className="from-group"  > 
            <label htmlFor="name">Restaurant img</label>
            <input type="text" className="form-control"
            name="img" placeholder="Restaurant img"
            onChange={handleChange}
            value={restaurant.img}
            />
          </div>

          <Link to="" className="btn btn-success" onClick={handleClick}>Add</Link>
          {""}
          <Link to="/" className="btn btn-danger" onClick={handleClear}>Cancle</Link>
          </form>
        </div>
      </div>
      </div> 
    </div> 
  )
}

export default Add;
