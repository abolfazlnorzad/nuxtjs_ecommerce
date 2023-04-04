export default defineNuxtPlugin(async nuxtApp => {

    const {authUser} = useAuth()

    try {
        const data = await $fetch("/api/auth/me",{
            method:"GET",
            headers:{ ...useRequestHeaders(['cookie']) }
        })
        authUser.value = data
    } catch (e) {
        console.log(e)
    }

})