import Button from '@/components/Button'
import Field from '@/components/Field'
import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { organizationSerivce } from '@/services/organization'
import { handleError } from '@/utils/handleError'
import { regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const {loading,refetch:contactService} = useQuery({
        enabled:false,
        queryFn: () => organizationSerivce.contact(form.values)
    })
    const form = useForm({
        name:[required()],
        phone:[required(), regexp('phone')],
        email:[required(), regexp('email')],
        website:[required()],
        title:[required()],
        content:[required()]
    })

    const onSubmit = async () => {
        if(!user) {
            message.warning('Bạn cần đăng nhập để gửi thông tin liên hệ')
            return
        }
        try {
            if(form.validate()) {
                const res = await contactService()
                if(res.success) {
                    message.success('Gửi thông tin liên hệ thành công')
                    form.reset()
                }
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <main id="main">
            <div className="register-course">
                <section className="section-1 wrap container">
                    {/* <div class="main-sub-title">liên hệ</div> */}
                    <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
                    <p className="top-des">
                        Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị,
                        cũng như
                        việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
                    </p>
                    <div className="form">
                        <label>
                            <p>Họ và tên<span>*</span></p>
                            <Field {...form.register('name')} type="text" placeholder="Họ và tên bạn" />
                        </label>
                        <label>
                            <p>Số điện thoại</p>
                            <Field {...form.register('phone')} type="text" placeholder="Số điện thoại" />
                        </label>
                        <label>
                            <p>Email<span>*</span></p>
                            <Field {...form.register('email')} type="text" placeholder="Email của bạn" />
                        </label>
                        <label>
                            <p>Website</p>
                            <Field {...form.register('website')} type="text" placeholder="Đường dẫn website http://" />
                        </label>
                        <label>
                            <p>Tiêu đề<span>*</span></p>
                            <Field {...form.register('title')} type="text" placeholder="Tiêu đề liên hệ" />
                        </label>
                        <label>
                            <p>Nội dung<span>*</span></p>
                            <Field {...form.register('content')} 
                                renderField={props => <textarea {...props} name id cols={30} rows={10} placeholder='Nội dung liên hệ' onChange={ev => props.onChange(ev.target.value)} className='w-full form-control' defaultValue={""} />}
                            />
                        </label>
                        <Button loading={loading} disabled={loading} onClick={onSubmit} className="btn main rect">đăng ký</Button>
                    </div>
                </section>
                {/* <div class="register-success">
          <div class="contain">
              <div class="main-title">đăng ký thành công</div>
              <p>
                  <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br>
                  Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                  hoặc số điện thoại của bạn.
              </p>
          </div>
          <a href="/" class="btn main rect">về trang chủ</a>
      </div> */}
            </div>
        </main>

    )
}

export default Contact