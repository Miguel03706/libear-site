import React, { useState } from "react";
import { Center, Image, Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import API from "../../pages/api/firebase";
import styles from "./Entrar.module.scss";


export default function Entrar() {

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string()
                .required("Você precisa digitar um email")
                .email("Preencha com um email válido"),
            password: yup.string()
                .required("você precisa digitar uma senha")
                .min(6, "A senha deve conter no mínimo 6 caracteres")
        }),
        validateOnChange: false,
        validateOnBlur: false
    })

    async function validarDados() {
        setLoading(true);
        let { email, password } = formik.values;
        await API.loginUser(email, password);
        setLoading(false);
    }

    return (
        <div className={styles.Container}>
            <Center> <Image src={`icons/logo_urso.webp`} /> </Center>
            <Center> <h1>Entrar</h1></Center>

            <form className={styles.Form}>
                <Center marginTop="30px">
                    <Input
                        variant="flushed"
                        type="email"
                        placeholder="Digite seu email"
                        textAlign="center"
                        {...formik.getFieldProps("email")}
                    />
                </Center>
                <Center marginTop="30px">
                    <Input
                        variant="flushed"
                        type="password"
                        placeholder="Digite sua senha"
                        textAlign="center"
                        {...formik.getFieldProps("password")}
                    />
                </Center>

                <Center marginTop="20px">
                    <Button
                        colorScheme="teal"
                        onClick={validarDados}
                        disabled={loading ? true : false}>
                        Entrar
                    </Button>
                </Center>

                <Center marginTop="20px">
                    <div className={styles.Link} >
                        Não possui uma conta?<Link href="/cadastrar"><a> Criar</a></Link>
                    </div>
                </Center>
            </form>
        </div>
    );
}
