export default defineEventHandler(async event=>{

    const { public:{ apiBase } } = useRuntimeConfig()
    const token = getCookie(event , "token")
    try {
        const data = await $fetch(`${apiBase}/auth/me`,{
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method:"POST"
        })
        return data.data
    }catch (error){
        if (error.statusCode === 401) {
            setCookie(event, 'token', '', {
                httpOnly: true,
                secure: true,
                maxAge: new Date(0),
                path: '/'
            })
        }
        return error
    }

})