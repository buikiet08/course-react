import { ORGANIZATION_API } from "@/config/api"
import { http } from "@/config/http"

export const organizationSerivce = {
    contact(data) {
        return http.post(`${ORGANIZATION_API}/contact`, data)
    }
}