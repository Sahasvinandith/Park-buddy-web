import { Car, SquareX,UserPlus } from "lucide-react";
import { Button, Cascader } from "antd";
import { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { Add_event } from "./Calender_clicked_funcs";

let username = "Client-0";
let Vehicle_type = "Car";
let Vehicle_number;
let Arrival_time = new Date();
let Expected_duration=3;
let End_time=new Date(Arrival_time.getTime() + 3*60*60*1000);

function Add_car_popup(props) {
    const { Close,Park_lot_id,User_id } = props;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex flex-col justify-center items-center">
            <div className="flex flex-col w-1/2 h-5/6">
                <div className="flex flex-row w-full justify-end p-0 m-0"><button onClick={Close}><SquareX color='white' size={'40px'} /></button></div>

                <div className=" w-full h-full bg-gradient-to-br from-gray-500 to-gray-300 rounded-lg">
                    <div className="w-full flex flex-col gap-3 items-center h-full">
                        <div className="w-1/3 h-max bg-gradient-to-r from-green-600 to-green-800 text-3xl font-bold flex justify-center text-white  px-3 py-2 rounded-t-none rounded-b-3xl">
                            Reserve a spot
                        </div>
                        <div className="flex flex-row w-full h-3/4 mx-10">
                            <div className="w-1/3 h-full flex flex-col bg-gray-950 text-white ml-3 text-xl pt-3">
                                <div className="flex-1 p-2 flex justify-center items-center">Vehicle type :</div>
                                <hr />
                                <div className="flex-1 p-2 flex justify-center items-center">Vehicle Number :</div><hr />
                                <div className="flex-1 p-2 flex justify-center items-center">Arrival time :</div><hr />
                                <div className="flex-1 p-2 flex justify-center items-center">Expected duration :</div>
                            </div>
                            <div className="w-2/3 h-full flex flex-col bg-gray-300 text-black mr-3 text-xl pt-3">
                                <div className="flex-1 p-2 text-xl flex justify-center items-center">
                                    <Cascader
                                        size="large"


                                        style={{ width: "40%", fontSize: 68 }}
                                        options={[{ value: "Car", label: "Car" }, { value: "Van", label: "Van" }, { value: "Lorry", label: "Lorry" }, { value: "Others", label: "Others" }]}
                                        defaultValue={"Car"}


                                        onChange={(e)=>{

                                            try {
                                                Vehicle_type=e[0];
                                            } catch (error) {
                                                Vehicle_type=[];
                                            }
                                            console.log("Vehicle:: ",e);
                                           
                                        }}
                                    />
                                </div>
                                <hr />
                                <div className="flex-1 flex justify-center items-center"><input type="text" required className="bg-gray-100 h-1/2 py-4 px-4 border-2 uppercase" placeholder="Enter here" onChange={(e) => {
                                    Vehicle_number=e.target.value;
                                    
                                }
                                }>
                                </input>
                                </div>
                                <hr />


                                <div className="flex-1 p-2 flex justify-center items-center">{Arrival_time.toLocaleString()}</div><hr />
                                <div className="flex-1 p-2 flex justify-center items-center"><InputNumber changeOnWheel defaultValue={3} onChange={(e)=>{
                                    Expected_duration=e;
                                    End_time=new Date(Arrival_time.getTime() + Expected_duration*60*60*1000);
                                }}/></div>

                            </div>


                        </div>
                        
                        <div className="w-full h-auto flex justify-center items-center">
                            <Button className="h-full bg-green-400 font-semibold text-white text-xl py-3" onClick={() => { Add_event(Park_lot_id,User_id,username,Arrival_time.toISOString(),Expected_duration,End_time.toISOString(), Vehicle_type, Vehicle_number); Close(); }} >Add to spot <UserPlus/></Button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )

}

export default Add_car_popup;