import React, { useEffect, useState } from 'react';
import { Homepage_navbar } from './Homepage_navbar'
import { Homepage_menu } from './Homepage_menu'
import { Parkview } from './homepage_components/Parkview/UserParkview'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Homepage = () => {
    const { User_email } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
            } else {
                navigate('/');
            }
            setLoading(false);
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Homepage_navbar />
            <div className="flex bg-gray-300">
                <div className="lg:w-72 sm:w-56 md:w-56 h-auto flex-grow-0">
                    <Homepage_menu className="h-auto" />
                </div>
                <div className="my-2 w-screen overflow-y-scroll">
                    <Parkview Usermail={user} />
                </div>
            </div>
        </div>
    );


}