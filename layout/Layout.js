import { Nav } from "./Nav"
import { Hamburger } from "./Hamburger"
import Head from "next/head"

export const Layout = ({ children }) => {
  return (
      <>
      <Head>
        <link rel="icon" href="/board.ico" />
      </Head>
      <Nav />
        <div>
          {children}
        </div>
     </>
  )

}
