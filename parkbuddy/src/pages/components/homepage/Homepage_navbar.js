import { useEffect, useState } from "react"
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LogOut } from 'lucide-react';
import { auth } from '../../../API/firebase_auth';
import { fetchCarpark_name } from "../../../API/Fetch_backend";

export const Homepage_navbar = (props) => {
    const { Cur_User, UserLogout } = props;





    const menu = (
        <Menu>
            <Menu.Item className="p-0" key="1">
                <Menu.Item key="1" className="text-black" onClick={() => auth.signOut()}>
                    <div className="flex flex-row gap-2">
                        <div className="font-semibold">Sign Out</div><LogOut size={"20px"} />
                    </div>
                </Menu.Item>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <div className='  font-extrabold flex w-full h-16 py-4 text-gray-400 bg-gray-800'>
                <div className="flex flex-1 pl-12 text-3xl text-yellow-500 justify-start">ParkBuddy</div>
                <div>{Cur_User.car_park}</div>
                <div className="flex flex-1 positon-right justify-end items-center">
                    <div className="mr-3 px-4 w-full  flex justify-end">
                        <Dropdown className="px-3 w-max py-7 border-0 hover:bg-slate-800" overlay={menu} >
                            <Button onClick={(e) => e.preventDefault()} className="bg-transparent text-yellow-50 hover:text-black">
                                <div className="text-lg">{Cur_User.user_name}<br /><div className="text-base">{Cur_User.email}</div>
                                </div> <DownOutlined />
                            </Button>
                        </Dropdown>

                    </div>
                </div>
            </div>



        </div>
    )
}

