import React from "react";
import { Box } from "@chakra-ui/react"
import Header from "../../components/header"
import Orientacao from "../../components/Orientacao"

export async function getServerSideProps(ctx) {
    const slug = ctx.params.explicacao;
    return {
        props: {
            slug
        }
    }
}

function Explicacao({ slug }) {

    return (
        <>
            <Header inicio={false} missoes={false} loja={false} config={false} />

                <Box height="auto" width="100%">
                    <Orientacao slug={slug} />
                </Box>
   
        </>
    )
}

export default Explicacao;

