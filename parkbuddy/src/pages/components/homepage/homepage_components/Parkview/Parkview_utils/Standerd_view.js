import { useEffect, useState } from "react"
import Park_slot_info from "./Park_slot_clicked";
import { fetchUser } from "../../../../../../API/Fetch_backend";
import { fetchUserRealTime } from "../../../../../../API/Fetch_backend";



export const Standard_view = ({ Usermail }) => {

    const [Cur_User, set_user] = useState("Loading");
    const [check_state, set_check] = useState();
    const [park_lot_name, set_name] = useState("null");
    const [Park_view, changeView] = useState(true);

    let newUser = {};
    let free_lots = 0;
    let Occ_lots = 0;
    let Total_lots = 0;
    let cur_parklot = 'sdss';
    const divElements = [];
    let assign_user;

    // useEffect(() => {
    //     async function main (){
    //         assign_user =await fetchUser(Usermail);
    //         set_user(assign_user);

    //     }
    //     main();
    // },[])
    // Initialize with null or appropriate initial value
    const [loading, setLoading] = useState(true); // Add a loading state

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const user = await fetchUser(Usermail);
    //             console.log("User:+ ", user);
    //             set_user(user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //             set_user(null); // Handle errors
    //         } finally {
    //             setLoading(false); // Set loading to false once fetch is complete
    //         }
    //     }

    //     fetchData();
    // }, [Park_view]); // Add Usermail to dependency array to refetch if Usermail changes

    useEffect(() => {
        const unsubscribe = fetchUserRealTime(Usermail, (userData) => {
            console.warn("New updation interface");
            set_user(userData); // Update state with the new user data
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         try {
    //             console.warn("fetching new info:");
    //             const user = await fetchUser(Usermail); // Fetch user without considering any variable

    //             set_user(user);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //             set_user(null); // Handle errors
    //         } finally {
    //             setLoading(false); // Set loading to false once fetch is complete
    //         }
    //     }, 2000); // 2000 milliseconds = 2 seconds

    //     // Cleanup interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, []); // Empty dependency array to set up the interval once






    if (Cur_User == "Loading" || Cur_User == null) {
        return (
            //loading screen
            <div>Loading</div>
        )
    }

    else {
        console.warn("Cur_user++: ", Cur_User);



        let User_User_lots = Cur_User.UserLots;





        for (let key in User_User_lots) {//checking occupancy of parking lot
            
            let park_lot_status = 'f'
            if (Object.hasOwnProperty.call(Cur_User.UserLots, key)) {

                const element = Cur_User.UserLots[key];

                Total_lots += 1;
                for (let cur_event in element.lot_events) {


                    if (Object.hasOwnProperty.call(element.lot_events, cur_event)) {
                        const now_event = element.lot_events[cur_event];

                        let start = now_event.start;
                        let end = now_event.end;
                        const startTime = new Date(start);
                        const endTime = new Date(end);
                        const currentTime = new Date();

                        if (currentTime >= startTime && currentTime <= endTime) {
                            park_lot_status = 'o'
                            break;
                        }



                    }
                }
                if (park_lot_status == 'f') {//decidinng if parking slot is free or occupied
                    free_lots += 1;
                    divElements.push(<div slotname={element.name} key={element.name} className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-green-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-green-300 hover:shadow-xl hover:bg-green-400 hover:border-green-100 hover:text-yellow-100" onClick={(e) => {
                        changeView(!Park_view);
                        cur_parklot = e.currentTarget.getAttribute("slotname");
                        set_name(cur_parklot);



                    }} >{element.name}<br />Free</div>);

                } else {
                    Occ_lots += 1;
                    divElements.push(<div key={element.name} slotname={element.name} className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-orange-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-red-300 hover:shadow-xl hover:bg-orange-400 hover:border-orange-100 hover:text-yellow-100" onClick={(e) => {
                        changeView(!Park_view)
                        cur_parklot = e.currentTarget.getAttribute("slotname");
                        set_name(cur_parklot);

                    }} >{element.name}<br />Occupied</div>);

                }

            }
        }







        return (
            <div className="flex justify-center">
                {Park_view ? <div className="bg-gray-700 mx-10 my-5 flex flex-col justify-center">
                    <div className="grid grid-cols-8 gap-10 px-5 py-10">
                        {divElements}

                    </div>
                    <div>
                        <hr />
                        <div className="flex flex-row justify-center bg-gray-600 pt-5 text-lg text-white">
                            <div className=" h-1 bg-white w-40 mt-3 mr-1">

                            </div>
                            Current status
                            <div className=" h-1 bg-white w-40 mt-3 ml-1">

                            </div>
                        </div>


                        <div className=" p-7 bg-gray-600 pt-5 text-white flex flex-col justify-center items-center">
                            <div>Total_lots : {Total_lots}</div>
                            <div>Free_lots : {free_lots}</div>
                            <div>Occupied lots : {Occ_lots}</div>
                            <div>Charge rate (Rs/hour) : 300</div>
                            <div>prebooks : 0</div>

                        </div>

                    </div>

                </div> : <Park_slot_info user={Cur_User} park_lot_id={park_lot_name} User_id={Cur_User.User_id} changemode={() => { changeView(!Park_view) }} />}

            </div>
        )
    }
}
