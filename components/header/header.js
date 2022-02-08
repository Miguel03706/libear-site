import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image, Button, Text } from "@chakra-ui/react";
import styles from "./header.module.scss";

export default function Header({ inicio, missoes, loja, config }) {
    const [user, setUser] = useState([]);
    const [nav, setNav] = useState(false);

    useEffect(() => {
        const userKey = Object.keys(window.sessionStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
        const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
        setUser(user);
    }, []);

    const routes = [
        { path: "/inicio", label: "Inicio", img: "../icons/inicio.webp", color: inicio, alt: "icone de uma casa" },
        { path: "/missoes", label: "Missões", img: "../icons/missoes.webp", color: missoes, alt: "icone de um livro" },
        { path: "/loja", label: "Loja", img: "../icons/loja.webp", color: loja, alt: "icone de uma loja" },
        { path: "/configurar", label: "Configurações", img: "../icons/config.webp", color: config, alt: "icone de duas engrenagens" },
        { path: "/inicio", label: '0', img: "../icons/chama-cinza.webp", alt: "icone de chama" },
        { path: "/perfil", label: "", img: `../user/user_img/${user.photoURL}.webp`, alt: "icone do usuario" }
    ]

    const routesMobile = [
        { path: "/inicio", label: "Inicio"},
        { path: "/missoes", label: "Missões"},
        { path: "/loja", label: "Loja"},
        { path: "/configurar", label: "Configurações"},
        { path: "/perfil", label: "Perfil"}
    ]

    function toggleMenu(){
        setNav(!nav);
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.wrapper}>
                    {routes.map(({ path, label, img, color, alt }, idx) => (
                        <div key={idx}>
                            <Link href={path} passHref>
                                <Button colorScheme="teal" variant="link">
                                    {color ?
                                        <Image size="64px" src={img} className={styles.imgSelect} alt={alt}/> : <Image size="64px" src={img} alt={alt}/>}
                                    {color ? <a className={styles.imgSelect}><div className="label_header">{label}</div></a> : <a><div className="label_header">{label}</div></a>}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </header>


            <header className={styles.headerMobile}>
                <Link href="/inicio">
                <Image src="user/user_img/polar.webp" h="40px" alt="menu" alt="icone de urso polar" />
                </Link>
                <nav className="nav">
                    <Button className="btn_mobile" onClick={toggleMenu}>
                        {nav ? 
                        <Image src="icons/uteis/teste2.webp" h="20px" alt="menu" /> 
                        : 
                        <Image src="icons/uteis/teste2.webp" h="20px" alt="menu"/> 
                        }
                    </Button>
                    {nav ? 
                    <ul className={styles.wrapperMobile}>
                        {routesMobile.map(({ path, label,}, idx) => (
                            <li key={idx}>
                                <Link href={path}>
                                    <Button colorScheme="teal" variant="link">
                                      <Text color="black" fontWeight="normal">{label}</Text>
                                    </Button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    : null}
                </nav>

            </header>
        </>
    );
}


