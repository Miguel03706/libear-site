import React from 'react';
import Header from '../components/header/header';
import Vendas from '../components/Vendas';

export default function loja() {
    return (
        <>
            <Header inicio={false} missoes={false} loja={true} config={false} />
            <Vendas />
        </>
    )
}
