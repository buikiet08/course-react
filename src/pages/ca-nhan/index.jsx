import Button from '@/components/Button'
import Field from '@/components/Field'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { ContextAvatar } from '@/layouts'
import { fileService } from '@/services/file'
import { userService } from '@/services/user'
import { setUserThunkAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { object } from '@/utils/object'
import { confirm, minMax, regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'

function Profile() {
    const {user} = useAuth()
    const dispatch = useDispatch()
    const [loadingTest,setLoadingTest] = useState(false)
    let {file,setFile} = useContext(ContextAvatar)
    const form = useForm({
        name: [required()],
        username: [required(), regexp('email')],
        phone: [required(), regexp('phone')],
        currentPassword: [
            (_,forms) => {
                if(forms.newPassword) {
                    const errorObj = validate({
                        currentPassword: [required(), minMax(6, 12)]
                    }, forms)
                    return errorObj.currentPassword
                }
            }
        ],
        newPassword: [
            (value,forms) => {
                if(forms.currentPassword) {
                    if(forms.currentPassword === value) return "Vui lòng điền giống mật khẩu cũ"
                    const errorObj = validate({
                        newPassword: [required(), minMax(6, 12)]
                    }, forms)
                    return errorObj.newPassword
                }
            }
        ],
        confirmPassword: [
            confirm('newPassword')
        ]
    }, {initialValue: user})
    // update info
    const {loading, refetch: updateService} = useQuery({
        enabled:false,
        queryFn: ({params}) => userService.updateProfile(...params)
    })
    // update password
    const {loading:loadingChangePassword, refetch:changePasswordService} = useQuery({
        enabled:false,
        queryFn: ({params}) => userService.changePassword(...params)
    })
    
    const onSubmit = async () => {
        setLoadingTest(true)
        const checkOldData = object.isEqual(user, form.values, 'name', 'phone')
        let avatar
        if(file) {
            const res = await fileService.uploadFile(file)
            if(res.link) {
                avatar = res.link
            }
        }
        console.log(avatar)
        console.log(form.values)
        if(!avatar && !form.values.newPassword && checkOldData) {
            message.warning('Vui lòng nhập thông tin để thay đổi')
        }
        if(form.validate()) {
            if(avatar || !checkOldData) {
                updateService({
                    ...form.values,
                    avatar : avatar
                })
                .then(res => {
                    dispatch(setUserThunkAction(res.data))
                    setFile(null)
                    message.success('Cập nhật thông tin tài khoản thành công')
                }).catch(handleError)
            }

            if(form.values.newPassword) {
                changePasswordService({
                    currentPassword: form.values.currentPassword,
                    newPassword: form.values.newPassword
                })
                .then(res => {
                    form.setValues({
                        currentPassword:'',
                        newPassword:'',
                        confirmPassword:''
                    })
                    message.success('Thay đổi mật khẩu thành công')
                }).catch(handleError)

            }
        }
        setLoadingTest(false)
    }
    return (
        <div className="tab1">
            <label>
                <p>Họ và tên<span>*</span></p>
                <Field placeholder="Họ và tên" {...form.register('name')} />
            </label>
            <label>
                <p>Số điện thoại<span>*</span></p>
                <Field placeholder="Số điện thoại" {...form.register('phone')} />
            </label>
            <label>
                <p>Email<span>*</span></p>
                <Field disable={true} placeholder="Email" {...form.register('username')} />
            </label>
            <label>
                <p>Mật khẩu cũ<span>*</span></p>
                <Field placeholder="Mật khẩu cũ" type='password' {...form.register('currentPassword')} />
            </label>
            <label>
                <p>Mật khẩu mới<span>*</span></p>
                <Field placeholder="Mật khẩu mới" type='password' {...form.register('newPassword')} />
            </label>
            <label>
                <p>Xác nhận<span>*</span></p>
                <Field placeholder="Xác nhận mật khẩu" type='password' {...form.register('confirmPassword')} />
            </label>
            <Button className="btn main rect" loading={loadingTest || loading || loadingChangePassword} disabled={loadingTest || loading || loadingChangePassword} onClick={onSubmit}>LƯU LẠI</Button>
        </div>

    )
}

export default Profile