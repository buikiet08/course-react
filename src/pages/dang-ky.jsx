import Button from '@/components/Button'
import Field from '@/components/Field'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { useScrollTop } from '@/hooks/useScrollTop'
import { useSearch } from '@/hooks/useSearch'
import { userService } from '@/services/user'
import { loginByCodeThunkAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { confirm, regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function SignUp() {
    const dispatch = useDispatch()
    const [search] = useSearch()
    useScrollTop()
    const form = useForm({
        name: [required()],
        username: [required(), regexp('email')],
        password: [required()],
        confirmPassword: [
            confirm('password')
        ]
    }, {
        dependencies: {
            password: ['confirmPassword']
        }
    })
    useEffect(() => {
        if (search.code) {
            dispatch(loginByCodeThunkAction({ code: search.code }))
        }
    }, [])
    const { loading, refetch: registerService } = useQuery({
        enabled: false,
        queryFn: () => userService.register({
            ...form.values,
            redirect: window.location.origin + window.location.pathname,
            limitDuration: 3000
        })
    })
    const onSubmit = async () => {
        try {
            if (form.validate()) {
                const res = await registerService()
                message.success(res.message)
            }
        } catch (error) {
            handleError(error);
        }
    }
    return (
        <main id="main">
            <div className="auth">
                <div className="wrap">
                    <h2 className="title">Đăng ký</h2>
                    <div className="mb-[20px]">
                        <Field placeholder="Họ và tên" {...form.register('name')} />
                    </div>
                    <div className="mb-[20px]">
                        <Field placeholder="Địa chỉ Email" {...form.register('username')} />
                    </div>
                    <div className="mb-[20px]">
                        <Field placeholder="Mật khẩu" type='password' {...form.register('password')} />
                    </div>
                    <div className="mb-[20px]">
                        <Field placeholder="Nhập lại mật khẩu" type='password' {...form.register('confirmPassword')} />
                    </div>

                    <p className="policy">
                        Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a> của Spacedev
                    </p>
                    <Button loading={loading} disabled={loading} onClick={onSubmit}>Đăng ký</Button>
                </div>
            </div>
        </main>

    )
}

export default SignUp