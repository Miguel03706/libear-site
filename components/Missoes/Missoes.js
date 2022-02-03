import React, { useState, useEffect, useCallback } from "react"
import API from "../../pages/api/firebase";
import { Text, Flex, Center, Square, Button, Image, useColorMode } from "@chakra-ui/react";
import styles from "./Missoes.module.scss"

function Missoes() {
    const [missoes, setMissoes] = useState([])
    const [completos, setCompletos] = useState([])
    const { colorMode, toggleColorMode } = useColorMode()



    useEffect(() => {
      //  DB.exibirMissoes().then(setMissoes)
    }, [])

    const handleFinaliza = useCallback(evt => {
        evt.preventDefault();
    }, [missoes])

    // useEffect(async () => {
    //     await DB.completaMissao(completos);
    //     DB.exibirMissoes().then(setMissoes)
    // }, [completos])

    return (
        <div className={styles.container}>
            <div className={styles.missoes}>
            <Center as="h2" fontSize="26px" borderBottom="1px solid black"> Missões </Center>

                {missoes.length <= 0 &&
                    <div className={styles.loading}>
                        <img src="../icons/uteis/loading.gif" alt="carregando" />
                    </div>
                }
                {/* {missoes.map(task => {
                    return (
                        <div key={task.id_missao}>
                            <Flex color="white">
                                {task.missoes[`${task.id_missao}`].complete == 0 ?
                                    <>
                                        <Center w="30%" borderBottom="1px solid black">
                                            <Image src={`../images/missoes/${task.img}.webp`} alt={`${task.texto}`} h="100px" w="auto" />
                                        </Center>
                                        <Square w="20%" p="5px" borderBottom="1px solid black">
                                            <Button colorScheme={colorMode === "light" ? "teal" : "blue"} onClick={(e) => setCompletos(task.id_missao)} color={colorMode === "light" ? "#fff !important" : "#000 !important"}>Completar</Button>
                                        </Square>
                                        <Center w="50%" borderBottom="1px solid black">
                                            <Text color={colorMode === "light" ? "#000000 !important" : "#fff !important"}>{task.texto}</Text>
                                        </Center>
                                    </>
                                    :
                                    <></>
                                }
                            </Flex>
                        </div>
                    )
                })} */}
            </div>

            <div className={styles.missoes_complete} >
            <Center as="h2" fontSize="26px" borderBottom="1px solid black"> Missões Concluídas</Center>
            {missoes.length <= 0 &&
                    <div className={styles.loading}>
                        <img src="../icons/uteis/loading.gif" alt="carregando" />
                    </div>
                }
              {/* {missoes.map(task => {
                    return (
                        <div key={task.id_missao}>
                            <Flex color="white">
                                {task.missoes[`${task.id_missao}`].complete == 1 ?
                                    <>
                                        <Center w="30%" borderBottom="1px solid black">
                                            <Image src={`../images/missoes/${task.img}.webp`} alt={`${task.texto}`} h="100px" w="auto" />
                                        </Center>
                                        <Square w="20%" p="5px" borderBottom="1px solid black">
                                            <Image src="../icons/uteis/checked.webp" h="64px"/>
                                        </Square>
                                        <Center w="50%" borderBottom="1px solid black">
                                            <Text color={colorMode === "light" ? "#000000 !important" : "#fff !important"}>{task.texto}</Text>
                                        </Center>
                                    </>
                                    :
                                    <></>
                                }
                            </Flex>
                        </div>
                    )
                })} */}
              </div>

        </div>
    )
}

export default Missoes;