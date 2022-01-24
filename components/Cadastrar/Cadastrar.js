import React from "react"
import { Center, Image, Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Cadastrar.module.scss";

export default function Cadastrar() {

    return (
        <div className={styles.Container}>
            <Center> <Image src={`icons/logo_urso.webp`} /> </Center>
            <Center> <h1>Cadastrar</h1></Center>

            <form className={styles.Form}>
                <Center marginTop="30px">
                    <Input
                        variant="flushed"
                        type="email"
                        placeholder="Digite seu email"
                        textAlign="center"
                    />
                </Center>
                <Center marginTop="30px">
                    <Input
                        variant="flushed"
                        type="password"
                        placeholder="Digite sua senha"
                        textAlign="center"
                    />
                </Center>

                <Center marginTop="20px">
                    <Button colorScheme="teal">Cadastrar</Button>
                </Center>

                <Center marginTop="20px">
                    <div className={styles.Link} >
                        Já possui uma conta?<Link href="/entrar"><a> Entrar</a></Link>
                    </div>
                </Center>
            </form>

        </div>
    );
}