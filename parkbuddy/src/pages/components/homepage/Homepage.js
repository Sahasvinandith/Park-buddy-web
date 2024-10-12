import React, { useEffect, useState } from 'react';
import { Homepage_navbar } from './Homepage_navbar'
import { Homepage_menu } from './Homepage_menu'
import { Parkview } from './homepage_components/Parkview/UserParkview'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchCarpark_name } from '../../../API/Fetch_backend';
import { History_page } from './homepage_components/History/History';

export const Homepage = () => {
    const { User_email } = useParams();
    const navigate = useNavigate();
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);

    function logout() {
        console.log("Logging out");
        // getAuth().signOut();
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is authenticated: ", user.email); //changed
                async function fetch(){
                    let user_data= await fetchCarpark_name(user.email);
                    setUser(user_data);
                }
                fetch();
                
            } else {
                console.log("No user is authenticated, redirecting...");//changed
                navigate('/');
            }
            setLoading(false);
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, [navigate]);

    if (loading == true || User == null) {
        return <div>Loading...</div>;
    }
    else {
        console.warn("USer:: ",User)
        return (
            <div>
                <Homepage_navbar Cur_User={User} />
                <div className="flex bg-gray-300">
                    <div className="lg:w-72 sm:w-56 md:w-56 h-auto flex-grow-0">
                        <Homepage_menu tabto0={() => setTab(0)} tabto1={() => setTab(1)}  className="h-auto" />
                    </div>
                    <div className="my-2 w-screen">
                        {
                            tab == 0 ?<Parkview Usermail={User.email} UserLogout={logout()} /> : tab ==1 ? <History_page User_email={User.email}/>: <div></div>
                        }
                        
                    </div>
                </div>
            </div>
        );

    }




}