import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
        //  location: ""
    });

    // const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Fetch current geolocation
    //             const navLocation = () => {
    //             return new Promise((res, rej) => {
    //                 navigator.geolocation.getCurrentPosition(res, rej);
    //             });
    //         }
    //         const res = await navLocation();
    //         const { latitude, longitude } = res.coords;

    //         // Fetch address based on geolocation
    //             const response = await fetch("http://localhost:5000/api/auth/getlocation", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ lat: latitude, long: longitude })
    //         });

    //         const { location } = await response.json();
    //         setAddress(location);
    //         setcredentials({ ...credentials, geolocation: location });
    //     } catch (error) {
    //         console.error('Error fetching location:', error);
    //         // Handle error, e.g., show error message to user
    //     }
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create user with entered credentials
            const response = await fetch ("http://localhost:5000/api/createuser", {
                // const response = await fetch ("/createuser", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                    // location: credentials.location
                    // location: credentials.location
                })
            });
                       
            //   console.log(response);
            const json = await response.json();
            // if (json.success) {  
                if (response.ok) {
                // Save the auth token to local storage and redirect
                localStorage.setItem('token', json.authToken);
                navigate("/login");
            } else {
                alert("Enter Valid Credentials");
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error, e.g., show error message to user
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" required />
                        {/* <fieldset>
                            <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" required />
                        </fieldset> */}
                        {/* <fieldset>
                            <input type="text" className="form-control" name='address'  value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" required />
                        </fieldset> */}
                    </div>
                    {/* <div className="m-3">
                        <button type="button" onClick={handleClick} name="geolocation" className="btn btn-success">Click for current Location </button>
                    </div> */}
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' required />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    )
}
