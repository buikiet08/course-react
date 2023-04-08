import Button from '@/components/Button'
import Field from '@/components/Field'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { getUserThunkAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { setToken } from '@/utils/token'
import { confirm, regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function ResetPassword() {
    const [search] = useSearchParams()

    const code = search.get('code')
    const dispatch = useDispatch()
    const { loading: loadingSendMail, refetch: sendMailService } = useQuery({
        enabled: false,
        queryFn: () => userService.sendMailResetPassword(formSendMail.values)
    })
    const { loading: loadingReset, refetch: resetMailService } = useQuery({
        enabled: false,
        queryFn: () => userService.resetPasswordByCode({
            password:formReset.values.password,
            code:code
        })
    })

    const formSendMail = useForm({
        username: [required(), regexp('email')]
    })

    const formReset = useForm({
        password: [required()],
        confirmPassword: [
            required(),
            confirm('password')
        ]
    })

    const onSendMail = async () => {
        try {
            if(formSendMail.validate()) {
                const res = await sendMailService()
                message.success(res.message)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const onReset = async () => {
        try {
            if(formReset.validate()) {
                const res = await resetMailService()
                message.success('Thay đổi mật khẩu thành công')
                setToken(res.data)
                dispatch(getUserThunkAction())
            }
        } catch (error) {
            handleError(error);
        }
    }
    return (
        <main id="main">
            <div className="auth">
                {
                    code ?
                    <div className="wrap">
                        <h2 className="title">Đặt lại mật khẩu</h2>
                        <Field {...formReset.register('password')} type="password" placeholder="Mật khẩu " />
                        <Field {...formReset.register('confirmPassword')} type="password" placeholder="Nhập lại mật khẩu" />
                        <Button loading={loadingReset} disabled={loadingReset} onClick={onReset} className="btn rect main">Đặt lại mật khẩu</Button>
                    </div> :
                    <div className="wrap">
                        <h2 className="title">Đặt lại mật khẩu</h2>
                        <Field {...formSendMail.register('username')} type="text" placeholder="Email" />
                        <Button loading={loadingSendMail} disabled={loadingSendMail} onClick={onSendMail} className="btn rect main">Đặt lại mật khẩu</Button>
                    </div>
                }
            </div>
        </main>

    )
}

export default ResetPassword