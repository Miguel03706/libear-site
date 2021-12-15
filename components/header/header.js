import React, { useEffect, useState } from 'react';
import Link from "next/link"
import { Image, Button } from "@chakra-ui/react";
import styles from "./header.module.scss";

export default function Header({ inicio, missoes, loja, config }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const userKey = Object.keys(window.sessionStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
        const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
        setUser(user);
    }, []);

    const routes = [
        { path: "/inicio", label: "Inicio", img: "../icons/inicio.webp", color: inicio },
        { path: "/missoes", label: "Missões", img: "../icons/missoes.webp", color: missoes },
        { path: "/loja", label: "Loja", img: "../icons/loja.webp", color: loja },
        { path: "/configurar", label: "Configurações", img: "../icons/config.webp", color: config },
        { path: "/inicio", label: '0', img: "../icons/chama-cinza.webp" },
        { path: "/perfil", label: "", img: `../user/user_img/${user.photoURL}.webp` }
    ]

    return (
        <>
            <header className={styles.header}>
                <div className={styles.wrapper}>
                    <nav>
                        <ul>
                            {routes.map(({ path, label, img, color }, idx) => (
                                <li key={idx}>
                                    <Link href={path}>
                                        <Button colorScheme="teal" variant="link">
                                            {color ?
                                                <Image size="64px" src={img} className={styles.imgSelect} /> : <Image size="64px" src={img} />}
                                            {color ? <a className={styles.imgSelect}><div className="label_header">{label}</div></a> : <a><div className="label_header">{label}</div></a>}
                                        </Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

        </>
    );
}


