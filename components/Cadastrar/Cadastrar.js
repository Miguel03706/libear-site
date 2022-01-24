import React from "react"
import { Center, Image, Button, Input } from "@chakra-ui/react";
import styles from "./Cadastrar.module.scss";

export default function Cadastrar(){

    return(
        <div className={styles.Container}>
            <Center> <Image src={`icons/logo_urso.webp`}/> </Center>
        </div>
    );
}