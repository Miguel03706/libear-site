import React from "react";
import Link from "next/link"
import { Image, Button, Heading, Text, Center, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Container, Col, Row } from 'react-bootstrap';
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <Image src="images/polar.webp" alt="foto de um urso na antartida" />
        <div>
          <span>
            <Text fontSize={{ base: "12px", md: "18px", lg: "25px" }} color='white' >Aprenda libras da melhor maneira!</Text>
          </span>
          <Link href="/cadastrar">
            <Button colorScheme="blue" className={styles.btn_start}>Começar</Button>
          </Link>
          <Link href="/entrar">
            <Button colorScheme="blue" className={styles.btn_login}>
              Já tenho uma conta
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <Center>
          <Heading as='h1' fontFamily="arial" marginTop="30px"> Libear </Heading>
        </Center>

        <Container>
          <Row className="justify-content-md-center" md={2}>
            <Col md={1} bg="dark">
            <Image src="images/planeta-terra.webp" alt="foto do planeta Terra" />
            </Col>
            <Col md={1} bg="blue">
              <p>Ensino de qualidade</p>
              <Text letterSpacing="2px" textAlign="center">
                O jeito mais inovador de aprender idiomas! Aprender com o Libear é divertido e viciante.
                Ganhe pontos ao acertar, corra contra o tempo e passe de nível. As nossas aulas são rápidas
                e eficazes.
              </Text>
            </Col>
          </Row>
        </Container>
        {/*         
        <SimpleGrid columns={2} spacing={10} marginTop="30px" minChildWidth="sm">
          <GridItem w="100%" h="auto">
            <Center> <Image src="images/planeta-terra.webp" alt="foto do planeta Terra" /> </Center>
          </GridItem>
          <GridItem w="100%" h="auto">
            <Center h="100px"><p>Ensino de qualidade</p></Center>
            <Text letterSpacing="2px" textAlign="center">
              O jeito mais inovador de aprender idiomas! Aprender com o Libear é divertido e viciante.
              Ganhe pontos ao acertar, corra contra o tempo e passe de nível. As nossas aulas são rápidas
              e eficazes.
            </Text>
          </GridItem>
          <GridItem w="100%" h="auto">
            <Center> <Image src="images/moeda.webp" alt="foto de uma moeda" /> </Center>
          </GridItem>
          <GridItem w="100%" h="auto">
            <Center h="100px"><p>Libear premium</p></Center>
            <Text letterSpacing="2px" textAlign="center">
              Melhore o seu aprendizado com o Libear premium
              Aprender um idioma no Libear é totalmente gratuito, mas você pode remover
              os anúncios e apoiar a educação gratuita com o premium.
            </Text>
          </GridItem>
        </SimpleGrid> */}
      </div>
    </>
  )
}
