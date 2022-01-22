import { Image, SimpleGrid, GridItem, Text, Box, Container, IconButton, Link, Center } from "@chakra-ui/react"
import { FaInstagram } from 'react-icons/fa'
import styles from "./footer.module.scss"

function Footer() {

    return (
        <>
            <div className={styles.footer}>
                <SimpleGrid columns={3} spacing={10}>
                    <GridItem w="100%" h="100px">
                        <Center>
                            <Image src="../icons/logo_urso.webp" alt="desenho de um urso polar sorrindo" />
                        </Center>
                    </GridItem>
                    <GridItem w="100%" h="100px" >
                        <Center>
                            <Text fontSize={{ base: "12px", md: "16px", lg: "18px" }} color="white" lineHeight="100px" textAlign="center">
                                Contato@libear.com.br
                            </Text>
                        </Center>
                    </GridItem>
                    <GridItem w="100%" h="100px">
                        <Container centerContent h="100px" >
                            <Box h="100%" marginTop="25px">
                                <Link href="https://www.instagram.com/libear_librasparatodos/?igshid=17n81zkb3gy4u" isExternal>
                                    <IconButton
                                        isRound={true}
                                        colorScheme="cyan"
                                        aria-label="Call Segun"
                                        size="lg"
                                        icon={<FaInstagram />}
                                    />
                                </Link>
                            </Box>
                        </Container>
                    </GridItem>
                </SimpleGrid>
            </div>

        </>
    );
}

export default Footer;