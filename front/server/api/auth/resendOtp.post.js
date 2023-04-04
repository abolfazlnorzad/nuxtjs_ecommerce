
export default defineEventHandler(async event=>{
    const {public: {apiBase}} = useRuntimeConfig()
    const loginToken = getCookie(event, "login_token")

    try {
        const data = await $fetch(`${apiBase}/auth/resend-otp`, {
            body:{  login_token:loginToken },
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
        return  true
    }catch (e) {
        return e
    }
})