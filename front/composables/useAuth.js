export const useAuth = () => {
    const authUser = useState('user-login', () => null)

    return { authUser }
}