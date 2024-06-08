import { SquareX } from "lucide-react";

function Create_event(props) {
    const {Close}=props;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex flex-col justify-center items-center">
            <div className="flex flex-col">
                <button onClick={Close}><SquareX color='white' size={'40px'} /></button>
                <div>Hello</div>
            </div>
            

        </div>
    )

}

export default Create_event;