import Button from '@/components/Button'
import Field from '@/components/Field'
import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { useScrollTop } from '@/hooks/useScrollTop'
import { loginThunkAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useScrollTop()
    const { loginLoading } = useAuth()
    const form = useForm({
        username: [required(), regexp('email')],
        password: [required()]
    })

    const pathRegisterCourse = localStorage.getItem('pathRegisterCourse')
    console.log(pathRegisterCourse)

    const onSubmit = async () => {
        try {
            if (form.validate()) {
                await dispatch(loginThunkAction(form.values)).unwrap();
                message.success('Đăng nhập thành công')
                if(pathRegisterCourse) {
                    navigate(pathRegisterCourse)
                } else {
                    navigate(PATH.Profile.index)
                }
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <main id="main">
            <div className="auth">
                <div className="wrap">
                    {/* login-form */}
                    <div className="ct_login">
                        <h2 className="title">Đăng nhập</h2>
                        <div className='mb-[20px]'>
                            <Field placeholder="Email / Số điện thoại" type='text' {...form.register('username')} />
                        </div>
                        <div className='mb-[20px]'>
                            <Field placeholder="Mật khẩu" type='password' {...form.register('password')} />
                        </div>
                        <div className="remember">
                            <label className="btn-remember">
                                {/* <div>
                                    <input type="checkbox" />
                                </div>
                                <p>Nhớ mật khẩu</p> */}
                            </label>
                            <Link to={PATH.ResetPassword} className="forget">Quên mật khẩu?</Link>
                        </div>
                        <Button loading={loginLoading} disabled={loginLoading} onClick={onSubmit}>Đăng nhập</Button>
                        <div className="text-register">
                            <span>Nếu bạn chưa có tài khoản?</span> <Link className="link" to={PATH.SignUp}>Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default SignIn