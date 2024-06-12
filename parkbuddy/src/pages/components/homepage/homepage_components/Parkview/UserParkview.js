
import { Standard_view } from "./Parkview_utils/Standerd_view";

export const Parkview=(props)=>{
    const {Usermail} = props;
    
    
    return(
        <div>
                <Standard_view Usermail={Usermail}/>
        </div>
        //time 
    )
}