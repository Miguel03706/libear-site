import React, { useEffect, useState } from 'react';
import API from "../../../pages/api/firebase";
import { Text, Image, Center, Square, Box, Button, useToast } from "@chakra-ui/react";
import styles from "../Vendas.module.scss";

export default function ListarCompras({ money }) {
    const [compras, setCompras] = useState([]);
    const [bought, setBought] = useState([]);
    const [has, setHas] = useState([]);
    const [dinheiro, setDinheiro] = useState(0);
    const toast = useToast()

    useEffect(() => {
        async function fetchData() {
            await API.listPurchases().then(setCompras);
            //TODO: ARRUMAR O BOUGHT (itens comprados)
            await API.setBuy().then(setBought);
            await API.setMoney().then(setDinheiro);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function activeHas() {
            { await bought.map(itens => { setHas(itens) }) }
        }
        activeHas()
    }, [bought, has])

    useEffect(() => {
        money(dinheiro)
    }, [dinheiro, money]);

    async function activeBuy(preco, id) {
        if (parseInt(dinheiro) >= parseInt(preco)) {
            await API.buyItens(id, preco);
            await API.listPurchases().then(setCompras);
        } else if (parseInt(preco) > parseInt(dinheiro)) {
            toast({
                title: "Sem dinheiro.",
                description: "Você não tem dinheiro suficiente para comprar esse produto, realize mais atividades para ganhar mais prêmios.",
                status: "error",
                duration: 2000,
                isClosable: true,
                containerStyle: {
                    textAlign: "center"
                },
            })
        }
    }


    return (
        <div className={styles.List}>
            {compras.map(itens => {
                return (
                    <div key={itens.id} >
                        <Box
                            w="auto"
                            border="1px solid black"
                        >
                            <Center>
                                <Text
                                    fontFamily='Karla'
                                    fontWeight="bold !important"
                                >
                                    {itens.nome}
                                </Text>
                            </Center>
                        </Box>
                        <Box
                            w="auto"
                            border="1px solid black"
                            h="260px"
                        >
                            <Center
                                marginTop="30px"
                            >
                                <Image
                                    src={`../images/loja/${itens.img}.webp`}
                                    h="100px"
                                    w="auto"
                                    alt={itens.nome}
                                />
                            </Center>
                            <Center
                                textAlign="center"
                                p="20px"
                            >
                                <Text>{itens.descricao}</Text>
                            </Center>
                        </Box>
                        <Square
                            w="auto"
                            border="1px solid black"
                            p="10px"
                        >
                            {
                                has[`${itens.id}`] == false ?
                                    <Button
                                        colorScheme="blue"
                                        onClick={(e) => {
                                            activeBuy(itens.preco, itens.id)
                                        }}
                                    >
                                        Comprar por: {itens.preco}</Button>
                                    :
                                    <>
                                        <Button colorScheme="blue" isDisabled>Já possui</Button>
                                    </>
                            }
                        </Square>
                    </div>
                )
            })}
        </div>
    )
}
