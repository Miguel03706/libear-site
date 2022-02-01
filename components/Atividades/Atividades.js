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

    useEffect(async () => {
        await API.readActivity().then(setAtividades);
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
                            <div className={styles.loading}>
                                <img src="../icons/uteis/loading.gif" alt="carregando" />
                            </div>
                        </>
                    }

                    {atividades.map(atividade => {
                        return (
                            <div key={atividade.id} className={styles.lista}>
                                aaa
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
