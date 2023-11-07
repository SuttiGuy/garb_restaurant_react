import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from  "../services/api";
import Card from "../components/Card";
// import authHeader from "../services/auth.header";
import Loading from "../components/loading";
import * as loadingData from "../loading/restaurant.json"
import Swal from 'sweetalert2'


const Search = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setsearchText] = useState([]);
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get(`/restaurant`);
        setRestaurants(res.data);
      } catch (error) {}
    };
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

        await axios.delete(`/restaurant/${id}` );
        window.location.reload()
    } catch (error) {
        console.error(error);
    }
   }

  return (
    <div>
      <h1>Restaurant</h1>
      <from className="d-flex grid">
        <input 
          type="text"
          className="from-control"
          name="name"
          placeholder="Search Menu"
          value={searchText}
          onChange={(event) => {
            setsearchText(event.target.value);
          }}
        />
      </from>
      <div className="row">
        <div className="restaurant">
          {restaurants.filter((restaurant) => {
              return restaurant.name.includes(searchText);
            })
            .map((restaurant) => {
              
              return (
                <Card restaurant={restaurant}
                handleDelete={handleDelect} 
                key={restaurant.id} 
                 />
              );
            })}
          ;
        </div>
      </div>
    </div>
  );
};

export default Search;
