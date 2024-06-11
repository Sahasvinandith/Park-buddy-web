import React from 'react';
import { Homepage_navbar } from './components/homepage/Homepage_navbar'
import { Homepage_menu } from './components/homepage/Homepage_menu'
import { Parkview } from './components/homepage/homepage_components/Parkview/UserParkview'
import { User } from '../exampleUser';
export const Homepage = () => {
    let YUser = User;
    return (
        <div>

            <Homepage_navbar />
            <div className='flex bg-gray-300'>

                <div className='lg:w-72 sm:w-56 md:w-56 h-auto flex-grow-0'>
                    <Homepage_menu className="h-auto" />
                </div>
                <div className=' my-2 w-screen overflow-y-scroll '>
                    <Parkview />
                </div>

            </div>

        </div>
    )
}