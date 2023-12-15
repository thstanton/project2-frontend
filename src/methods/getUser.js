import { useCookies } from "vue3-cookies"

export default function getJwt() {
    const { cookies } = useCookies()
    const jwt = cookies.get('user_session')
    return jwt
}