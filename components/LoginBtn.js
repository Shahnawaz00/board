import { useSession, signIn, signOut } from "next-auth/react"
import styles from "../styles/components/LoginBtn.module.scss"

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {

    return (
      <>
        <button className={styles.loginBtn} onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button className={styles.loginBtn} onClick={() => signIn()}>Sign in</button>
    </>
  )
}
