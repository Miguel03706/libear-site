import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Atividades from "../components/Atividades";

export default function inicio() {
  const [user, setUser] = useState(true);
  useEffect(() => {
    window.localStorage.removeItem("redirect");
    const userKey = Object.keys(window.sessionStorage).filter((it) =>
      it.startsWith("firebase:authUser")
    )[0];
    const user = userKey
      ? JSON.parse(sessionStorage.getItem(userKey))
      : undefined;
    if (user !== undefined) {
      return null;
    } else {
      setUser(false);
    }
  }, []);

  useEffect(() => {
    if (user == false) {
      location.href = "https://libear-site.vercel.app/entrar";
    }
  }, [user]);

  return (
    <>
      <Header inicio={true} missoes={false} loja={false} config={false} />
      <Atividades />
    </>
  );
}
