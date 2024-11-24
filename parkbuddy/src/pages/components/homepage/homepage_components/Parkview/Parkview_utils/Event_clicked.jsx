import { SquareX } from 'lucide-react';
import React, { useState } from 'react';
import { UpdatePayment } from '../../../../../../API/Fetch_backend';
function Popup_event(props) {
    const { Close, Info,User_id } = props;
    const [showbill, setshowbill] = useState(false);
    var strt = new Date(Info.Start_time);
    var endd = new Date(Info.End_time);
    var nowt = new Date();
    
    var str_start_time = strt.toLocaleString();
    var str_end_time = endd.toLocaleString();
    var str_current_time = nowt.toLocaleString();
    var duration_milis = (nowt - strt);
    var durationHours = Math.floor(duration_milis / (1000 * 60 * 60));
    var durationMinutes = Math.floor((duration_milis % (1000 * 60 * 60)) / (1000 * 60));
    var duration_str = durationHours + "h " + durationMinutes + "m";
    var charge,charge_method;
    if (durationMinutes > 30) {
        charge = 300 * (durationHours + 1);
        charge_method="300 perhour * "+(durationHours+1)+" hours";
    } else {
        charge = 300 * durationHours + 200;
        charge_method="300 perhour * "+durationHours+"hours + 200";
    }

    function paid({amount}){

        //function of backend to update database about payment
        
        var res=UpdatePayment({Event_id:Info.Id,Lot_id:Info.Parking_lot,Usermail:User_id,Amount:amount});


    }

    function cancel() {

    }

    if (showbill) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex flex-col justify-center items-center">

                <div className='flex flex-row w-1/2 justify-end p-0 m-0'><button onClick={Close}><SquareX color='white' size={'40px'} /></button></div>
                <div className="w-1/2 h-1/3 bg-slate-200 p-2 flex flex-col pl-4 items-start font-semibold gap-1" >
                    Login time: {str_start_time}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Logout time: {str_current_time}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Expected logout time: {str_end_time}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Duration: {duration_str}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Charge: Rs. {charge_method + " = " + charge}
                    <div className='w-full h-full flex justify-center'>
                        <button className='m-5 w-32 bg-green-500 text-white font-semibold p-6 rounded-lg' onClick={() => paid({amount:charge})}>Paid</button>
                        <button className='m-5 w-32 bg-red-500 text-white font-semibold p-6 rounded-lg' onClick={() => cancel(!showbill)}>Cancel</button>
                    </div>

                </div>
            </div>
        )
    }
    else {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex flex-col justify-center items-center">

                <div className='flex flex-row w-1/3 justify-end p-0 m-0'><button onClick={Close}><SquareX color='white' size={'40px'} /></button></div>
                <div className="w-1/3 h-1/3 bg-slate-200 p-2 flex flex-col pl-4 items-start font-semibold gap-1" >
                    User : {Info.Driver_name}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Vehical model: {Info.Vehicle}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Vehical number: {Info.Vehicle_number}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Login time: {str_start_time}
                    <div className='w-full bg-black h-[calc(1px)]'></div>
                    Expected logout time: {str_end_time}
                    <div className='w-full h-full flex justify-center'><button className='m-5 bg-green-500 text-white font-semibold p-6 rounded-lg' onClick={() => setshowbill(!showbill)}>Show Bill</button></div>

                </div>
            </div>
        )
    }



}

export default Popup_event;

