import Image from 'next/image'
import logo from "../public/images/logo.svg"
import Link from 'next/link'
import styles from '../styles/components/Footer.module.scss'
import {BsCircleFill} from 'react-icons/bs'

const Footer = () => {
  return (
    <div>
<div className={styles.footer}>
         <Image
                 src={logo}
                 alt="board logo"
                 width={100}
                 height={25}
                 className={styles.logo}
           />
           <div className={styles.footerText} >
             <Link href='/' >About</Link>
             <BsCircleFill size={8} />
             <Link href='/' >Terms</Link>
             <BsCircleFill size={8} />
            <Link href='/' >Privacy</Link>
           </div>
        </div>
    </div>
  )
}

export default Footer
