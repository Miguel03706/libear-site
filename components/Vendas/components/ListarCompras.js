import React, { useEffect, useState } from 'react';
import API from "../../../pages/api/firebase";
import { Text, Image, Center, Square, Box, Button, useToast } from "@chakra-ui/react";

export default function ListarCompras({ money }) {
    const [compras, setCompras] = useState([]);
    const [dinheiro, setDinheiro] = useState(0);
    const [preco, setPreco] = useState(0);
    const [comprar, setComprar] = useState([]);
    const toast = useToast()

    useEffect(() => {
        async function fetchData(){
            await  API.listPurchases().then(setCompras);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchMoney(){
         { await compras.map(itens => {  setDinheiro(itens.dinheiro) }) }
        }
        fetchMoney();
        console.log(compras);
    }, [compras]);

    useEffect(() => {
        async function setMoney(){
            await money(dinheiro);
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
            {/* {compras.map(itens => {
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
                                itens.compras[`${itens.id}`].buy == 0 ?
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
            })} */}
        </>
    )
}
