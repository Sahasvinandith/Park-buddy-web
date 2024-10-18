import './LoginForm.css';
import { useState, useRef, useEffect } from 'react';
import { Create_user } from '../../../API/Fetch_backend';
import { useParams, useNavigate } from 'react-router-dom';

let Car_park_name = '';
let Car_park_address = '';
let Num_car_park_slots = '';

const Signup_contents = () => {
    const { User_email, User_name } = useParams();
    const navigate = useNavigate();

    const [gpsLocation, setGpsLocation] = useState('');
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Initialize the Google Map
    const initMap = () => {
        const defaultLocation = { lat: 0, lng: 0 };

        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: defaultLocation,
            zoom: 2,
        });

        setMap(googleMap);

        googleMap.addListener('click', (event) => {
            const selectedLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            setGpsLocation(`${selectedLocation.lat}, ${selectedLocation.lng}`);

            // Create or update the marker
            if (markerRef.current) {
                markerRef.current.setPosition(selectedLocation);
            } else {
                const marker = new window.google.maps.Marker({
                    position: selectedLocation,
                    map: googleMap,
                    title: 'Selected Car Park Location',
                    draggable: true, // Allow marker to be moved
                    animation: window.google.maps.Animation.DROP, // Add drop animation
                });
                markerRef.current = marker;
            }

            googleMap.setCenter(selectedLocation);
        });
    };

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const existingScript = document.getElementById('googleMapsScript');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
                script.id = 'googleMapsScript';
                script.async = true;
                script.defer = true;
                script.onload = () => initMap();
                document.body.appendChild(script);
            } else {
                initMap(); // If the script is already loaded, initialize the map
            }
        };

        if (!window.google) {
            loadGoogleMapsScript();
        } else if (!map) {
            initMap();
        }
    }, [map]);

    return (
        <div className='newbody'>
            <div className='enterinfo'>
                <div className='flex-1 text-2xl'>Final step to create your account</div>

                {/* Car Park Name Input */}
                <div className='input-group'>
                    <label>Car park name:</label>
                    <div className="newinputbox">
                        <input type="text" className='placeholder:text-grey-300' placeholder='Car park' required onChange={(e) => { Car_park_name = e.target.value; }} />
                    </div>
                </div>

                {/* Car Park Address Input */}
                <div className='input-group'>
                    <label>Car park address:</label>
                    <div className="newinputbox">
                        <input type="text" className='placeholder:text-grey-300' placeholder='Address' required onChange={(e) => { Car_park_address = e.target.value; }} />
                    </div>
                </div>

                {/* Number of Parking Lots Input */}
                <div className='input-group'>
                    <label>Number of parking lots:</label>
                    <div className="newinputbox">
                        <input type="text" className='placeholder:text-grey-300' placeholder='Number' required onChange={(e) => { Num_car_park_slots = e.target.value; }} />
                    </div>
                </div>

                {/* Div to Render Google Map */}
                <div className='flex-1 flex flex-col gap-0'>
                    <div className='flex-1 gap-2 text-base flex flex-row justify-between items-center'>
                        <div>Click on the map to select GPS Location:</div>
                    </div>
                    <div 
                        ref={mapRef}
                        style={{ width: '100%', height: '270px', marginTop: '10px' }}
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
