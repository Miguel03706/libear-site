import { SimpleGrid, Box, Circle, Image, Center, Button } from "@chakra-ui/react"
import styles from "./footer.module.scss"
import Link from "next/link"

function FooterMobile() {


    return (
        <>
            <div className={styles.footerMobile}>
                <div className={styles.footerIcons}>
                    <SimpleGrid columns={[5, null, 1]} spacing="2px">
                        <Box height="100px" width="50px">
                            <Center>
                                <Link href="/loja">
                                    <Button colorScheme="teal" variant="link">
                                        <Image src="../mobile/video.webp" alt="icone com simbolo de play" />
                                    </Button>
                                </Link>
                            </Center>
                        </Box>
                        <Box height="100px" width="50px">
                            <Center>
                                <Link href="/missoes">

                                    <Button colorScheme="teal" variant="link">
                                        <Image src="../mobile/trofeu.webp" alt="icone de trofeu" />
                                    </Button>
                                </Link>
                            </Center>
                        </Box>
                        <Box height="100px" width="50px" className={styles.home}>
                            <div className={styles.circle}></div>
                            <Center>
                                <Link href="/inicio">

                                    <Button colorScheme="teal" variant="link">
                                        <Image src="../mobile/casa-branca.webp" alt="icone de uma casa" />
                                    </Button>
                                </Link>
                            </Center>
                        </Box>
                        <Box height="100px" width="50px">
                            <Center>
                                <Link href="/perfil">

                                    <Button colorScheme="teal" variant="link">
                                        <Image src="../mobile/user.webp" alt="icone de um usuario" />
                                    </Button>
                                </Link>
                            </Center>
                        </Box>
                        <Box height="100px" width="50px">
                            <Center>
                                <Link href="/configurar">

                                    <Button colorScheme="teal" variant="link">
                                        <Image src="../mobile/config.webp" alt="icone de uma engrenagem" />
                                    </Button>
                                </Link>
                            </Center>
                        </Box>
                    </SimpleGrid>
                </div>
            </div>
        </>
    );
}

export default FooterMobile;