import React, { useState } from "react";
import { Center, Image, Button, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/pages/entrar.module.scss";

export default function Entrar() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();

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
                .required("Você precisa digitar uma senha")
                .min(6, "A senha deve conter no mínimo 6 caracteres")
        }),
        validateOnChange: false,
        validateOnBlur: false,
        // Aqui está a solução do erro do TypeScript:
        onSubmit: async (values) => {
            setLoading(true);

            // Note que agora pegamos do "values" direto do Formik
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password
            });

            setLoading(false);

            if (result?.error) {
                toast({
                    title: "Erro ao entrar",
                    description: result.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                router.push("/dashboard");
            }
        }
    });

    async function validarDados() {
        setLoading(true);
        const { email, password } = formik.values;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        setLoading(false);

        if (result?.error) {
            toast({
                title: "Erro ao entrar",
                description: result.error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            // Mude "/dashboard" para a página que o usuário deve ir após o login
            router.push("/dashboard");
        }
    }

    return (
        <div className={styles.Container}>
            <Center> <Image src={"icons/logo_urso_sorrindo.webp"} alt="icone de urso polar sorrindo" /> </Center>
            <Center> <h1>Entrar</h1></Center>

            <form className={styles.Form} onSubmit={formik.handleSubmit}>
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
                        type="submit"
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