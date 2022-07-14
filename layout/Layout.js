import { Nav } from "./Nav"
import { Hamburger } from "./Hamburger"

export const Layout = ({ children }) => {
  return (
      <>
      <Nav />
        <div>
          {children}
        </div>
     </>
  )

}
