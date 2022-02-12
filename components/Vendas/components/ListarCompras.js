import React, { useEffect, useState } from 'react';
import API from "../../../pages/api/firebase";
import { Text, Image, Center, Square, Box, Button, useToast } from "@chakra-ui/react";

export default function ListarCompras({ money }) {
    const [compras, setCompras] = useState([]);
    const [comprar, setComprar] = useState([]);
    const [bought, setBought] = useState([]);
    const [dinheiro, setDinheiro] = useState([]);
    const [preco, setPreco] = useState(0);
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

    // useEffect(() => {
    //     console.log(bought);
    // }, [bought]);

    useEffect(() => {
        async function setMoney() {
            { await dinheiro.map(itens => { money(itens.dinheiro) }) }
            //await money(dinheiro);
        }
        setMoney();
    }, [dinheiro, money]);

    // useEffect(async () => {
    //     if (parseInt(dinheiro) >= parseInt(preco)) {
    //         await API.buyItens(comprar, preco);
    //         await API.listPurchases().then(setCompras);
    //     } else if (parseInt(preco) > parseInt(dinheiro)) {
    //         toast({
    //             title: "Sem dinheiro.",
    //             description: "Você não tem dinheiro suficiente para comprar esse produto, realize mais atividades para ganhar mais prêmios.",
    //             status: "error",
    //             duration: 1500,
    //             isClosable: true,
    //         })
    //     }

    // }, [comprar]);

    return (
        <>
            {compras.map(itens => {
                //TODO: ARRUMAR O BOUGHT (itens comprados)
                //    console.log(bought[0])
                return (
                    <div key={itens.id}>
                        <Box w="auto" border="1px solid black">
                            <Center>
                                <Text fontFamily='Karla' fontWeight="bold !important">{itens.nome}</Text>
                            </Center>
                        </Box>
                        <Box w="auto" border="1px solid black">
                            <Center><Image src={`../images/loja/${itens.img}.webp`} h="100px" w="auto" /></Center>
                            <Center textAlign="center"><Text>{itens.descricao}</Text></Center>
                        </Box>
                        <Square w="auto" border="1px solid black" p="5px">
                            {
                                itens[`${itens.id}`] == false ?
                                    <Button colorScheme="blue"
                                        onClick={(e) => {
                                            setPreco(itens.preco)
                                            setComprar(itens.id)
                                        }
                                        }>Comprar por: {itens.preco}</Button>
                                    :
                                    <>
                                        <Button colorScheme="blue" isDisabled>Já possui</Button>
                                    </>
                            }
                        </Square>
                    </div>
                )
            })}
        </>
    )
}
