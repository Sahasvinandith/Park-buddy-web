import './LoginForm.css';
import { Create_user } from '../../../API/Fetch_backend';
import { useParams } from 'react-router-dom';


let Car_park_name='';
let Car_park_address='';
let Num_car_park_slots='';
const Signup_contents = () => {

    const { User_email, User_name } = useParams();

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
                            <input type="text" className='placeholder:text-grey-300' placeholder='Coordinates' />
                        </div>
                    </div>
                    <div className='flex-1 text-xs w-full text-justify'>*Enter the GPS location of the entrance of your car park. You can either manually input the coordinates or let parkBuddy Web find it for you</div>

                </div>
                <div className='flex-1 flex justify-center items-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => { Create_user(User_email,User_name, Car_park_name, Car_park_address, Num_car_park_slots);}}>Submit</button>
                </div>




            </div>



        </div>
    )
}

export default Signup_contents;