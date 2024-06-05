import { useEffect, useState } from "react"
import { User } from "../../../../exampleUser"

export const Standard_view = () => {

    const [num_of_lots, set_lots] = useState(User.num_of_lots);

    useEffect(() => {
        set_lots(User.num_of_lots);
    })

    const divElements = [];

    for (const key in User.UserLots) {
        if (Object.hasOwnProperty.call(User.UserLots, key)) {
            const element = User.UserLots[key];
            if(element.current=="free"){
                divElements.push(<div className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-green-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-green-300 hover:shadow-xl hover:bg-green-400 hover:border-green-100 hover:text-yellow-100" >{element.name}<br/>Free</div>);

            }else{
                divElements.push(<div className=" rounded-lg h-5 w-5 ml-1 mr-0 flex justify-center font-semibold  cursor-pointer items-center  bg-orange-200 flex-1 text-center px-10 py-8 shadow-md border-r-2 border-2 border-red-300 hover:shadow-xl hover:bg-orange-400 hover:border-orange-100 hover:text-yellow-100" >{element.name}<br/>Occupied</div>);

            }
             
        }
    }

    

    return (
        <div className="flex justify-center">
            <div className="bg-gray-300 mx-10 my-5 flex justify-center">
                <div className="grid grid-cols-8 gap-10 px-5 py-10">
                    {divElements}

                </div>

            </div>
        </div>
    )

}