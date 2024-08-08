import React, { useState, useEffect } from 'react';
import { Standard_view } from "./Parkview_utils/Standerd_view";
import { fetchUser } from "../../../../../API/Fetch_backend";

export const Parkview = (props) => {
    const { Usermail } = props;
    return (
        <div>
            <Standard_view Usermail={Usermail}/>
        </div>
    );
}
