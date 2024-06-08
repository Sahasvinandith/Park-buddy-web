import { useEffect, useState } from "react"
import { User } from "../../../../exampleUser";
import Park_slot_info from "./Parkview/Park_slot_clicked";
import { db } from "../../../../API/firestore";
import { getDocs, collection } from "firebase/firestore";



export const Standard_view = () => {

    useEffect(() => {

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Car_Parks'));
                const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Info: ",dataArray);
                
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();


    }, [])

    let Cur_User = User;

    let free_lots = 0;
    let Occ_lots = 0;
    let Total_lots = 0;
    let cur_parklot = 'sdss';
    const [park_lot_name, set_name] = useState("null");

    const divElements = [];

    const [Park_view, changeView] = useState(true);


    let i = 0;
    for (const key in Cur_User.UserLots) {
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





            if (park_lot_status == 'f') {//deciding if parking slot is free or occupied
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
            {Park_view ? <div className="bg-gray-300 mx-10 my-5 flex flex-col justify-center">
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

            </div> : <Park_slot_info park_lot_id={park_lot_name} changemode={() => { changeView(!Park_view) }} />}

        </div>
    )

}