import React from "react"
import Footer from "../components/footer"
import { ChakraProvider, CSSReset, ColorModeScript } from "@chakra-ui/react"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <ColorModeScript initialColorMode="light" />
      
        <CSSReset />
        <Component {...pageProps} />
  
        <Footer />
      </ChakraProvider>
  )
}

export default MyApp
