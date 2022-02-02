import React, { useState, useEffect } from "react";
import { Center, Text } from "@chakra-ui/react"
import API from "../../pages/api/firebase";
import styles from "./orientacao.module.scss";

function Orientacao({ slug }) {
    const [explicacao, setExplicacao] = useState([]);

    useEffect(() => {
        API.getOrientation(slug).then(setExplicacao);
    }, [])

    useEffect(() => {
        console.log(explicacao);
    }, [explicacao])

    return (
        <>
            {explicacao.map(orientacao => {
                return (
                    <div key={orientacao.id}>
                        <Center as="h2" fontSize="26px" marginTop="50px" color="#00c3d3"><Text>{orientacao.titulo}</Text></Center>
                      <Center className={styles.video} marginTop="50px">
                                <iframe
                                    title={orientacao.titulo}
                                    src={orientacao.url}
                                    allowFullScreen
                                    height="300px"
                                    width="50%"
                                />
                        </Center>
                        <div className={styles.titulo}>
                            <Center marginTop="50px"><Text>{orientacao.orientacao}</Text></Center>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Orientacao;