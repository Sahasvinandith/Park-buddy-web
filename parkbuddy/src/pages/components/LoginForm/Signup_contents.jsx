import './LoginForm.css';
import { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef hooks
import { Create_user } from '../../../API/Fetch_backend';
import { useParams, useNavigate } from 'react-router-dom';


let Car_park_name='';
let Car_park_address='';
let Num_car_park_slots='';

const Signup_contents = () => {
    const { User_email, User_name } = useParams();
    const navigate = useNavigate();

    // States to store car park data and GPS coordinates
    const [gpsLocation, setGpsLocation] = useState('');
    const [map, setMap] = useState(null); // State to hold the Google Map instance
    const mapRef = useRef(null); // Reference to the div where the map will be rendered
    const markerRef = useRef(null); // Reference to the map marker

    // Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const coordinates = `${lat}, ${lng}`;
                    setGpsLocation(coordinates); // Set the GPS coordinates

                    // Initialize Google Maps when location is fetched
                    const userLocation = { lat, lng };
                    initMap(userLocation);
                },
                (error) => {
                    console.error("Error fetching location: ", error);
                    alert("Unable to fetch location. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    // Function to initialize and display the Google Map
    const initMap = (userLocation) => {
        if (!map) {
            const googleMap = new window.google.maps.Map(mapRef.current, {
                center: userLocation,
                zoom: 15, // Zoom level of the map
            });
            setMap(googleMap);

            // Place a marker on the user's location
            const marker = new window.google.maps.Marker({
                position: userLocation,
                map: googleMap,
                title: 'Your Location',
            });
            markerRef.current = marker;
        } else {
            // Update the marker position if map already exists
            markerRef.current.setPosition(userLocation);
            map.setCenter(userLocation);
        }
    };

    return (
        <div className='newbody'>
            <div className='enterinfo'>
                <div className='flex-1 text-2xl'>Final step to create your account</div>
                
                {/* Car Park Name Input */}
                <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center w-full'>
                    <div>Car park name:</div>
                    <div className="newinputbox">
                        <input type="text" className='placeholder:text-grey-300' placeholder='Car park' required onChange={(e) => { Car_park_name = e.target.value; }} />
                    </div>
                </div>

                {/* Car Park Address Input */}
                <div className='flex-1 flex flex-col justify-center gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>Car park address:</div>
                        <div className="newinputbox">
                            <input type="text" className='placeholder:text-grey-300' placeholder='Address' required onChange={(e) => { Car_park_address = e.target.value; }} />
                        </div>
                    </div>
                </div>

                {/* Number of Parking Lots Input */}
                <div className='flex-1 flex flex-col gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>Number of parking lots:</div>
                        <div className="newinputbox">
                            <input type="text" className='placeholder:text-grey-300' placeholder='number' required onChange={(e) => { Num_car_park_slots = e.target.value; }} />
                        </div>
                    </div>
                </div>

                {/* GPS Location Input */}
                <div className='flex-1 flex flex-col gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>GPS Location:</div>
                        <div className="newinputbox">
                            <input 
                                type="text" 
                                className='placeholder:text-grey-300' 
                                placeholder='Coordinates' 
                                value={gpsLocation} // Bind to GPS state
                                readOnly 
                            />
                        </div>
                    </div>

                    {/* Button to Get User Location */}
                    <button 
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' 
                        onClick={getLocation} // Fetch location
                    >
                        Get My Location
                    </button>

                    {/* Div to Render Google Map */}
                    <div 
                        ref={mapRef} // Reference to map div
                        style={{ width: '100%', height: '300px', marginTop: '10px' }} // Set map size
                    ></div>
                </div>

                {/* Submit Button */}
                <div className='flex-1 flex justify-center items-center'>
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' 
                        onClick={() => { 
                            Create_user(User_email, User_name, Car_park_name, Car_park_address, Num_car_park_slots, gpsLocation); 
                            navigate('/login');
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup_contents;

























/* import './LoginForm.css';

//new
import { useState } from 'react'; // Import useState for managing the state

import { Create_user } from '../../../API/Fetch_backend';
import { useParams, useNavigate } from 'react-router-dom';


let Car_park_name='';
let Car_park_address='';
let Num_car_park_slots='';
const Signup_contents = () => {

    const { User_email, User_name } = useParams();
    const navigator=useNavigate();



    //new
    // Step 1: State to store GPS coordinates
    const [gpsLocation, setGpsLocation] = useState('');

    // Step 2: Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const coordinates = `${lat}, ${lng}`;
                    
                    // Step 3: Update the state with the fetched coordinates
                    setGpsLocation(coordinates);
                },
                (error) => {
                    console.error("Error fetching location: ", error);
                    alert("Unable to fetch location. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };




    return (
        <div className='newbody'>
            <div className='enterinfo'>
                <div className='flex-1 text-2xl'>Final step to create your account</div>
                <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center w-full'>
                    <div>
                        Car park name:
                    </div>
                    <div className="newinputbox">
                        <input type="text" className='placeholder:text-grey-300' placeholder='Car park' required onChange={(e) => { Car_park_name = e.target.value; }} />
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-center gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>
                            Car park address:
                        </div>
                        <div className="newinputbox">
                            <input type="text" className='placeholder:text-grey-300' placeholder='Address' required onChange={(e) => { Car_park_address = e.target.value; }}/>
                        </div>
                    </div>
                    <div className='flex-1 text-xs w-full text-justify'>*This address will be shown to your user.But the navigation system will not use your address to navigate</div>

                </div>
                <div className='flex-1 flex flex-col gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>
                            Number of parking lots:
                        </div>
                        <div className="newinputbox">
                            <input type="text" className='placeholder:text-grey-300' placeholder='number' required onChange={(e) => { Num_car_park_slots = e.target.value; }}/>
                        </div>
                    </div>
                    <div className='flex-1 text-xs w-full text-justify'>*Enter how many parking slots your car park has. A Park slot should have enough spcae to park a Car,Van or Jeep.</div>

                </div>
                <div className='flex-1 flex flex-col gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>
                            GPS Location:
                        </div>
                        <div className="newinputbox">
                            <input 
                            type="text" 
                            className='placeholder:text-grey-300' 
                            placeholder='Coordinates' 
                            value={gpsLocation} // Step 4: Set the value to the GPS coordinates
                            readOnly 
                            />
                        </div>
                    </div>
                    <div className='flex-1 text-xs w-full text-justify'>*Enter the GPS location of the entrance of your car park. You can either manually input the coordinates or let parkBuddy Web find it for you</div>
                    <button 
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' 
                        onClick={getLocation}
                    >
                        Get My Location
                    </button>
                </div>
                <div className='flex-1 flex justify-center items-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => { Create_user(User_email,User_name, Car_park_name, Car_park_address, Num_car_park_slots,gpsLocation);navigator('/login');}}>Submit</button>
                </div>




            </div>



        </div>
    )
}

export default Signup_contents; */