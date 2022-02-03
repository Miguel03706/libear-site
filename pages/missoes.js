import React from "react";
import Header from "../components/header"
import Missoes from "../components/Missoes"

function Missions() {
    return (
        <>
            <Header inicio={false} missoes={true} loja={false} config={false}/>
            <Missoes/>
        </>
    )
}

export default Missions;