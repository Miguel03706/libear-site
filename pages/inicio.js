import React, { useState, useEffect }from "react";
import { SimpleGrid, Box, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../components/header";
import Atividades from "../components/Atividades";

export default function inicio() {
  const router = useRouter();
  useEffect(() => {
    window.localStorage.removeItem("redirect");
    const userKey = Object.keys(window.sessionStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
    if (user == undefined) {
      router.push('/entrar');
    }
  }, []);

  return (
    <>
      <Header inicio={true} missoes={false} loja={false} config={false} />
      <Atividades />
    </>
  );
}
