import { useEffect, useState } from "react"
import { HistoryCard } from "./Historyeventcard"
import { getHistoryEvents } from "../../../../../API/Fetch_backend"
export const History_page = ({ User_email }) => {
    const [history, setHistoryEvents] = useState({});
    useEffect(() => {
        async function fetchData() {
            const _historyEvents = await getHistoryEvents(User_email);
            console.log("History recieved", _historyEvents);
            setHistoryEvents(_historyEvents);
        }
        fetchData();
    }, []);
    let event = {

        "vehicle_number": "ABC123",
        "start": "2022-10-01T10:00:00.000Z",
        "end": "2022-10-01T11:00:00.000Z",
        "client_name": "Client-0",
        "client_email": "Client-0@Client-0.com",
        "vehicle_type": "Car",

    }
    if (history == {}) {
        <div className="flex items-center justify-center h-full w-full p-5 ">
            <div className="flex flex-col h-full w-full bg-slate-100 text-black font-semibold overflow-y-scroll">
                Loading..
            </div>

        </div>

    }
    else {
        return (
            // <div className="flex items-center justify-center h-full w-full p-5 ">
            //     <div className="flex flex-col h-full w-full bg-slate-100 text-black font-semibold overflow-y-scroll">
            //         History
            //         <div>
            //             <HistoryCard eventdata={event} />
            //         </div>
            //     </div>

            // </div>
            <div style={{ height: "calc(100vh - 80px)" }} className=" w-full bg-slate-100 text-black font-semibold overflow-y-scroll">
                <div className="text-4xl font-bold text-center">History</div><hr/>
                {Object.keys(history).length > 0 ? (
                    // Loop through each date in the history object
                    Object.keys(history).map((date) => (
                        <div key={date} style={{ marginBottom: '20px' }}>
                            <div className="text-xl font-bold py-1 px-2 ">{date}</div> {/* Display the date */}
                            <hr />

                            {/* Loop through each event under the given date */}
                            <div>
                                {Object.keys(history[date]).map((eventKey) => {
                                    const event = history[date][eventKey];
                                    {if (eventKey == "count") {
                                        return null;
                                        
                                    }}
                                    return (
                                        <HistoryCard 
                                            eventdata={event}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading events...</p> // Show loading while fetching
                )}
            </div>

        )
    }
}
