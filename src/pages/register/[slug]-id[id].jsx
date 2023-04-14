import Button from '@/components/Button'
import Field from '@/components/Field'
import { Select } from '@/components/Select'
import { Skeleton } from '@/components/Skeleton'
import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { useScrollTop } from '@/hooks/useScrollTop'
import courseService from '@/services/course'
import { currency } from '@/utils/currency'
import { handleError } from '@/utils/handleError'
import { regexp, required, validate } from '@/utils/validate'
import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, generatePath, useLocation, useNavigate, useParams } from 'react-router-dom'

function Register() {
    const { id } = useParams()
    const { pathname } = useLocation()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isSuccess, setSuccess] = useState(false)

    const path = generatePath(PATH.CourseRegister, { id })
    useEffect(() => {
        if (path == pathname && !user) {
            navigate(PATH.SignIn)
            message.warning('Bạn cần đăng nhập để đăng ký khóa học')
            window.addEventListener("popstate", function (event) {
                // Hành động khi nút "Back" được nhấn
                // event.state chứa thông tin về trạng thái trước đó (nếu có)
                navigate(PATH.Course)
            });
        }
    }, [])


    const { data, loading: loadingDetail } = useQuery({
        queryFn: () => courseService.getDetail(parseInt(id))
    })
    const { loading, refetch: registerService } = useQuery({
        enabled: false,
        queryFn: () => courseService.registerCourse(parseInt(id), {
            ...form.values,
            payment: 'chuyen-khoan'
        })
    })
    useScrollTop()
    const form = useForm({
        name: [required()],
        phone: [required(), regexp('phone')],
        email: [required(), regexp('email')],
        fb: [],
        note: [],
        payment: []
    })

    const onSubmit = async () => {
        console.log('vào')
        if (form.validate()) {
            try {
                const res = await registerService()
                if (res?.success) {
                    setSuccess(true)
                }
                message.success('Bạn đã gửi thông tin đăng kí thành công')
            } catch (error) {
                handleError(error)
            }
        }
    }

    if (loadingDetail) {
        return (
            <section className="register-course">
                <div className="container">
                    <div className="wrap container text-center m-auto">
                        <div className="flex flex-col justify-center items-center">
                            <div className="main-sub-title text-center"><Skeleton height={30} width={100} /></div>
                            <br />
                            <Skeleton height={50} width={280} />
                            <br />
                            <div className="flex gap-10 items-center">
                                <div className="date"><Skeleton height={20} width={140} /></div>
                                <div className="time"><Skeleton height={20} width={140} /></div>
                                <div className="time"><Skeleton height={20} width={140} /></div>
                            </div>
                        </div>
                        <div className="form px-10">
                            <Skeleton height={558} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <main id="main">
            {
                !isSuccess ? (
                    <section className="register-course">
                        <div className="container">
                            <div className="wrap container">
                                <div className="main-sub-title">ĐĂNG KÝ</div>
                                <h1 className="main-title">{data?.data?.title}</h1>
                                <div className="main-info">
                                    <div className="date"><strong>Khai giảng:</strong> 15/11/2020</div>
                                    <div className="time"><strong>Thời lượng:</strong> 18 buổi</div>
                                    <div className="time"><strong>Học phí:</strong>{currency(data?.data?.money)} VND</div>
                                </div>
                                <div className="form">
                                    <label>
                                        <p>Họ và tên<span>*</span></p>
                                        <Field {...form.register('name')} type="text" placeholder="Họ và tên bạn" />
                                    </label>
                                    <label>
                                        <p>Số điện thoại<span>*</span></p>
                                        <Field {...form.register('phone')} type="text" placeholder="Số điện thoại" />
                                    </label>
                                    <label>
                                        <p>Email<span>*</span></p>
                                        <Field {...form.register('email')} type="text" placeholder="Email của bạn" />
                                    </label>
                                    <label>
                                        <p>URL Facebook<span>*</span></p>
                                        <Field {...form.register('fb')} type="text" placeholder="https://facebook.com" />
                                    </label>
                                    <label>
                                        <p>Ý kiến cá nhân</p>
                                        <Field {...form.register('note')} type="text" placeholder="Mong muốn cá nhân và lịch bạn có thể học." />
                                    </label>
                                    <Button loading={loading} disabled={loading} className="btn main rect" onClick={onSubmit}>đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div class="register-success h-[500px] flex flex-col justify-center items-center py-6">
                        <div class="contain text-center">
                            <div class="main-title">đăng ký thành công</div>
                            <p>
                                <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br />
                                Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                                hoặc số điện thoại của bạn.
                            </p>
                        </div>
                        <Link to={PATH.Home} class="btn main rect mt-5">về trang chủ</Link>
                    </div>
                )
            }


        </main>

    )
}

export default Register