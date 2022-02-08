import React, { useState, useEffect } from "react";
import {
    CircularProgress, CircularProgressLabel, Image, Center, Popover, PopoverTrigger,
    PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton,
    Button, Portal, useDisclosure, VisuallyHidden, Skeleton
} from "@chakra-ui/react";
import Link from "next/link";
import API from "../../pages/api/firebase";
import styles from "./Atividades.module.scss";

export default function Atividades() {

    const initialFocusRef = React.useRef()
    const [atividades, setAtividades] = useState([]);
    const [color, setColor] = useState('');

    useEffect(() => {
        async function fetchData() {
            await API.readActivity().then(setAtividades);
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (localStorage.getItem('chakra-ui-color-mode') == "dark") {
            setColor('#49CFE1');

        } else {
            setColor('#E5DE2F');
        }
    }, [setColor]);

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.Atividades}>

                    {atividades.length <= 0 &&
                        <>
                            <div className={styles.Loading}>
                                <img src="../icons/uteis/loading.gif" alt="carregando" />
                            </div>
                        </>
                    }

                    {atividades.map(atividade => {
                        return (
                            <div key={atividade.id} className={styles.Lista}>
                                <Center>
                                    <CircularProgress value={50} size="100px" color={color}>
                                        <CircularProgressLabel>
                                            <Popover initialFocusRef={initialFocusRef}
                                                placement="bottom"
                                                closeOnBlur={true}
                                            >
                                                <PopoverTrigger>
                                                    <Button colorScheme="#00FFFFFF" className={styles.button} h="80px"><Center><Image src={`icons/atividades/${atividade.img}.webp`} h="70px" /></Center></Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent boxShadow="none !important">
                                                        <PopoverArrow />
                                                        <div className={styles.licao} key={atividade.id_atividade}>
                                                            <div className={styles.titulo}><Center marginTop="10px"><h2>{atividade.titulo}</h2></Center></div>
                                                        </div>
                                                        <PopoverCloseButton />
                                                        <PopoverBody className={styles.popBody}>
                                                            <Link href="explicacao/[explicacao]" as={`explicacao/${atividade.id}`} passHref>
                                                                <div className={styles.button}><Button colorScheme="blue" w="100%" marginBottom={2}>Explicação</Button><br /></div>
                                                            </Link>
                                                            <Link href="licao/[licao]" as={`licao/${atividade.id}`} passHref>
                                                                <Button colorScheme="blue" w="100%">Atividade</Button>
                                                            </Link>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        </CircularProgressLabel>
                                    </CircularProgress>
                                    <Center><div className={styles.subTitulo}><h2>{atividade.titulo}</h2></div></Center>
                                </Center>
                            </div>
                        )
                    })}

                </div>
                <div className={styles.Propaganda}>
                    <Skeleton height='100%' width="100%" />
                </div>

            </div>
        </>
    );
}
