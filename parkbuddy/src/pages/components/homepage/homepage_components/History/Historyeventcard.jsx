export function HistoryCard(props) {
    const {eventdata}=props;

    //eventdata={vehicle_number,start,end,client_name,client_email,vehicle_type,total amount}
    return (
        <div className="flex flex-col text-lg m-2 px-3 py-2 border-black border-2 rounded-lg w-calc[100%-10px] h-max">
            <div className="block w-full font-semibold text-xl">
                {eventdata.vehicle_number}
            </div>
            <div className="flex flex-row w-full">
                <div className="flex-1">Client name: {eventdata.client_name}</div>
                <div className="flex-1">Arrival time: {eventdata.start}</div>
                {/* billing maybe */}
                <div className="flex-1"></div>


            </div>
            <div className="flex flex-row w-full">
                <div className="flex-1">Vehicle type: {eventdata.vehicle_type}</div>
                <div className="flex-1">Departure time: {eventdata.end}</div>
                <div className="flex-1 text-xl font-bold">Balance: </div>
            </div>


        </div>
    )
}
