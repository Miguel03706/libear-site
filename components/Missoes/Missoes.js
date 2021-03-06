import React, { useState, useEffect } from "react"
import API from "../../pages/api/firebase";
import { Text, Flex, Center, Square, Button, Image, useColorMode } from "@chakra-ui/react";
import styles from "./Missoes.module.scss"

function Missoes() {
    const [missoes, setMissoes] = useState([])
    const [completos, setCompletos] = useState([])
    const [completar, setCompletar] = useState([])
    const { colorMode, toggleColorMode } = useColorMode()



    useEffect(() => {
        async function fetchData() {
            await API.getMissionsComplete().then(setCompletos);
            await API.getMissions().then(setMissoes);
        }
        fetchData();

    }, []);



    useEffect(() => {
        async function complete() {

            //FIXME: tentar arrumar a att de estado
            await API.completeMission(completar);
            await API.getMissionsComplete().then(setCompletos);
            await API.getMissions().then(setMissoes);
        }
        complete();
    }, [completar])

    return (
        <div className={styles.container}>
            <div className={styles.missoes}>
                <Center as="h2" fontSize="26px" borderBottom="1px solid black"> Missões </Center>

                {missoes.length <= 0 &&
                    <div className={styles.loading}>
                        <img src="../icons/uteis/loading.gif" alt="carregando" />
                    </div>
                }
                {missoes.map(task => {
                    return (
                        <div key={task.id}>
                            {completos[0][`${task.id}`] == 0 ?
                                <Flex color="white">
                                    <Center w="30%" borderBottom="1px solid black">
                                        <Image src={`../images/missoes/${task.img}.webp`} alt={`${task.texto}`} h="100px" w="auto" />
                                    </Center>
                                    <Square w="20%" p="5px" borderBottom="1px solid black">
                                        <Button colorScheme={colorMode === "light" ? "teal" : "blue"} onClick={(e) => setCompletar(task.id)} color={colorMode === "light" ? "#fff !important" : "#000 !important"}>Completar</Button>
                                    </Square>
                                    <Center w="50%" borderBottom="1px solid black">
                                        <Text color={colorMode === "light" ? "#000000 !important" : "#fff !important"}>{task.texto}</Text>
                                    </Center>
                                </Flex>
                                :
                                <></>
                            }
                        </div>
                    )
                })}
            </div>

            <div className={styles.missoes_complete} >
                <Center as="h2" fontSize="26px" borderBottom="1px solid black"> Missões Concluídas</Center>
                {missoes.length <= 0 &&
                    <div className={styles.loading}>
                        <img src="../icons/uteis/loading.gif" alt="carregando" />
                    </div>
                }
                {missoes.map(task => {
                    return (
                        <div key={task.id}>
                            <Flex color="white">
                                {completos[0][`${task.id}`] == 1 ?
                                    <>
                                        <Center w="40%" borderBottom="1px solid black">
                                            <Image src={`../images/missoes/${task.img}.webp`} alt={`${task.texto}`} h="100px" w="auto" />
                                        </Center>
                                        <Square
                                            w="auto"
                                            p="5px"
                                            borderBottom="1px solid black"
                                            textAlign="center"
                                        >
                                            <Image src="../icons/uteis/checked.webp" h="64px" />
                                        </Square>
                                        <Center
                                            w="60%"
                                            borderBottom="1px solid black"
                                            textAlign="center"
                                            p="5px"
                                        >
                                            <Text
                                                color={colorMode === "light" ? "#000000 !important" : "#fff !important"}
                                            >
                                                {task.texto}
                                            </Text>
                                        </Center>
                                    </>
                                    :
                                    <></>
                                }
                            </Flex>
                        </div>
                    )
                })}


            </div>




        </div>
    )
}

export default Missoes;