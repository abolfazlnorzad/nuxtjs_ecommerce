
export default defineEventHandler(async event=>{
    const body = await readBody(event)
    const {public: {apiBase}} = useRuntimeConfig()
    const loginToken = getCookie(event, "login_token")

    try {
        const data = await $fetch(`${apiBase}/auth/check-otp`, {
            body:{ ...body , login_token:loginToken },
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
        })
        setCookie(event,"token",data.data.token,{
            httpOnly:true,
            secure:true,
            path:"/",
            maxAge:60*60*76*24
        })

        setCookie(event,"login_token",'',{
            httpOnly:true,
            secure:true,
            path:"/",
            maxAge:new Date(0)
        })
        return  data.data.user
    }catch (e) {
        authUser.value =null
        return e
    }
})