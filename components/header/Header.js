import { useSelector } from "react-redux"
import HeaderLogin from "./HeaderLogin"
import SimpleHeader from "./SimpleHeader"

export default function Header() {

    const user = useSelector((state) => state.user)

    return (
        <>
            {
                user.isLogin ? (
                    <>
                        <HeaderLogin />
                    </>
                ) : (
                    <>
                        <SimpleHeader />
                    </>
                )
            }
        </>
    )
}