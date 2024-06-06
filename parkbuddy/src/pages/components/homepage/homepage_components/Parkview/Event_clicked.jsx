import { SquareX } from 'lucide-react';

function Popup_event(props) {
    const {Close,Info}=props;
    // var str_start_time=Info.Start_time.toLocaleDateString()+"  "+Info.Start_time.toLocaleTimeString();
    // var str_end_time=Info.End_time.toLocaleDateString()+"  "+Info.End_time.toLocaleTimeString();
    var strt=new Date(Info.Start_time);
    var endd=new Date(Info.End_time);
    var str_start_time=strt.toLocaleString();
    var str_end_time=endd.toLocaleString();
    var Duration=Math.ceil((endd-strt)/3600000);
    var charge=Duration*300;

    // console.log("Info: ",Info.Start_time.toUTCString());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex flex-col justify-center items-center">
            
            <div className='flex flex-row w-1/2 justify-end p-0 m-0'><button onClick={Close}><SquareX color='white' size={'40px'}/></button></div>
            <div className="w-1/2 h-1/3 bg-slate-200 p-2 flex flex-col pl-4 items-start font-semibold gap-1" >
                User : {Info.Driver_name}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Vehical model: {Info.Vehicle}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Vehical number: {Info.Vehicle_number}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Login time: {str_start_time}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Logout time: {str_end_time}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Duration: {Duration}
                <div className='w-full bg-black h-[calc(1px)]'></div>
                Charge= Rs. {charge}
            </div>
        </div>
        
    )
}

export default Popup_event;