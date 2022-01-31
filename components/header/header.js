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
        { path: "/inicio", label: "Inicio", img: "../icons/inicio.webp", color: inicio },
        { path: "/missoes", label: "Missões", img: "../icons/missoes.webp", color: missoes },
        { path: "/loja", label: "Loja", img: "../icons/loja.webp", color: loja },
        { path: "/configurar", label: "Configurações", img: "../icons/config.webp", color: config },
        { path: "/inicio", label: '0', img: "../icons/chama-cinza.webp" },
        { path: "/perfil", label: "", img: `../user/user_img/${user.photoURL}.webp` }
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
                    {routes.map(({ path, label, img, color }, idx) => (
                        <div key={idx}>
                            <Link href={path}>
                                <Button colorScheme="teal" variant="link">
                                    {color ?
                                        <Image size="64px" src={img} className={styles.imgSelect} /> : <Image size="64px" src={img} />}
                                    {color ? <a className={styles.imgSelect}><div className="label_header">{label}</div></a> : <a><div className="label_header">{label}</div></a>}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </header>


            <header className={styles.headerMobile}>
                <Link href="/inicio">
                <Image src="user/user_img/polar.webp" h="40px" alt="menu" />
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


