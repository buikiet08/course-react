import { COURSE_API } from "@/config/api"
import { http } from "@/config/http"

const courseService = {
   getList(query, signal) {
      return http.get(`${COURSE_API}/courses${query}`, {signal})
   },
   myCourse() {
      return http.get(`${COURSE_API}/courses/my-course`)
   },
   getDetail(id) {
      return http.get(`${COURSE_API}/courses/${id}`)
   },
   registerCourse( id, data ) {
      return http.post(`${COURSE_API}/courses/register/${id}`, data)
   },
   cancelCourse( id, data ) {
      return http.post(`${COURSE_API}/courses/cancel/${id}`, data)
   }
}

export default courseService