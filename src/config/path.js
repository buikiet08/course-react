const PROFILE = '/ca-nhan'
const COURSE = '/khoa-hoc'
export const PATH = {
    Home:'/',
    Profile:{
        index:PROFILE,
        MySource: PROFILE + '/khoa-hoc-cua-toi',
        MyProject: PROFILE + '/du-an-cua-toi',
        HistoryPayment:PROFILE + '/lich-su-thanh-toan',
        CourseView:PROFILE + '/kho-hoc-da-xem'
    },
    Course:COURSE,
    CourseDetail:COURSE + '/:id',
    CourseRegister:'/register/:id',
    Contact:'/contact/',
    Team:'/team',
    Project:'/project',
    SignIn:'/dang-nhap',
    SignUp:'/dang-ky',
    ResetPassword:'/reset-password'
}