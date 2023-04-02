export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    try {
        const data = await $fetch(`${apiBase}/auth/login`, {
            body,
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
        })
        setCookie(event,"login_token",data.data.login_token,{
            httpOnly:true,
            secure:true,
            path:"/",
            maxAge:60*60*76*24
        })
        return "done!"
    }catch (e) {
        return e
    }


})