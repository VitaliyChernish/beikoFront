import React, { useState } from "react";
import AdminCabinet from "../../cabinet/AdminCabinet";

const CreateOffer = () => {

    const [show, setShow] = useState(false)

    const showAdminpanel = () => {
        setShow(!show)
    }

    return (
        <div style={{ position: 'relative', left: '5vw' }}>
            <h1 onClick={showAdminpanel}>CREATE NEW OFFER</h1>
            {show ? <AdminCabinet /> : null}
        </div>
    )
}

export default CreateOffer;