import React from "react";
import { parseData } from "../../utils/functions";

const UserCabinetOrders = () => {
    return (
        <>
            <h1>User Orders</h1>
            <img style={{width: '200px', height: '200px'}} src={parseData('avatar')} alt="" />
        </>
    )
}

export default UserCabinetOrders;