import { isAxiosError } from "axios"
import { axios, setBearerToken } from "../axios"
import Cookies from "js-cookie"





export default class Auth {


    static async Login(info) {
        let data = {
            success:true,
            errors:{
                identifiant:'',
                password:""
            },
        }

        try {
            const res = await axios.post("login",info)
            if(res) {
                const responseData = res.data.data
                setBearerToken(responseData.token)
                Cookies.set("token",responseData.token,{expires:responseData.expires,secure:true})

                return data
            }
        } catch (error) {
            data.success = false
            if(isAxiosError(error)) {
                if(error.status == 400) {
                    const passEr = error.response.data.error
                    data.errors.password = passEr
                    return data
                }
                if(error.status == 422) {
                    const errors = error.response.data.errors
                    const identifiantEr = errors.identifiant ? errors.identifiant[0] : ""
                    const passEr = errors.password ? errors.password[0] : ""
                    data.errors = {
                        identifiant:identifiantEr,
                        password:passEr
                    }
                    return data
                }
                data.errors.identifiant = "Erreur du serveur"
                return data
            }
            data.errors.identifiant = "Erreur du serveur"
            return data
        }
        
        
    }
    static async user() {
        let data = {
            success:true,
            data:null,
            error:""
        }
        try {
            const res = await axios.get("user")
            if(res) {
                data.data = res.data.data
                return data
            }
        } catch (error) {
            data.success = false
            data.error = "Erreur du serveur"
            return data
        }
    
    }
    static async logout() {
        let data = {
            success:true,
            error:""
        }
        try {
            const res = await axios.post("logout")
            if(res) {
                return data
            }
        } catch (error) {
            data.success = false
            data.error.identifiant = "Erreur du serveur"
            return data
        }
        
        
    }
}