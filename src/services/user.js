import { USER_API } from "@/config/api"
import { http } from "@/config/http"

export const userService = {
    getProfile(){
        return http.get(`${USER_API}`)
    },
    register(data) {
        return http.post(`${USER_API}/register`, data)
    },
    updateProfile(data) {
        return http.patch(`${USER_API}`, data)
    },
    changePassword(data) {
        return http.post(`${USER_API}/change-password`, data)
    },
    sendMailResetPassword(data) {
        return http.post(`${USER_API}/reset-password`, data)
    },
    resetPasswordByCode(data) {
        return http.post(`${USER_API}/change-password-by-code`, data)
    }
}