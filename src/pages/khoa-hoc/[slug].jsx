import { Accordition } from '@/components/Accordion'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { useScrollTop } from '@/hooks/useScrollTop'
import courseService from '@/services/course'
import { currency } from '@/utils/currency'
import React from 'react'
import { Link, generatePath, useParams } from 'react-router-dom'

function CourseDetail() {
    const {id} = useParams()
    const {data} = useQuery({
        queryFn:() => courseService.getDetail(parseInt(id))
    })
    useScrollTop()
    console.log(data)
    const path = generatePath(PATH.CourseRegister, {id})
    return (
        <main className="course-detail" id="main">
            <section className="banner style2" style={{backgroundColor: data?.data?.template_color_banner || 'rgb(208, 249, 255)'}}>
                <div className="container">
                    <div className="info">
                        <h1>{data?.data?.title}</h1>
                        <div className="row">
                            <div className="date"><strong>Khai giảng:</strong> {data?.data?.opening_time}</div>
                            <div className="time"><strong>Thời lượng:</strong> {data?.data?.count_video} buổi</div>
                        </div>
                        <Link className="btn white round" style={{backgroundColor: data?.data?.template_color_btn || 'black'}} to={path}>đăng ký</Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="container">
                        <div className="video">
                            <div className="icon">
                                <img src="/img/play-icon-white.png" alt="" />
                            </div> <span>giới thiệu</span>
                        </div>
                        <div className="money">{currency(data?.data?.money)} VND</div>
                    </div>
                </div>
            </section>
            <section className="section-2">
                <div className="container">
                    <p className="des">{data?.data?.long_description}</p>
                    <h2 className="title">giới thiệu về khóa học</h2>
                    <div className="cover">
                        <img src="/img/course-detail-img.png" alt="" />
                    </div>
                    <h3 className="title">nội dung khóa học</h3>
                    <Accordition.Group>
                        {
                            data?.data?.content?.map((e, i) => <Accordition key={i} date={i + 1} {...e}>{e.content}</Accordition>)
                        }
                    </Accordition.Group>
                    {/* {
                        data?.content.map((e, i) => <Accordition key={i} title={e.title} date={i + 1}>{e.content}</Accordition>)
                    } */}
                    <h3 className="title">yêu cầu cần có</h3>
                    <div className="row row-check">
                        {
                            data?.data?.required.map((e,i) => (
                                <div key={i} className="col-md-6">{e.content}</div>
                            ))
                        }
                    </div>
                    <h3 className="title">hình thức học</h3>
                    <div className="row row-check">
                        {
                            data?.data?.benefits.map((e,i) => (
                                <div key={i} className="col-md-6">{e.content}</div>
                            ))
                        }
                    </div>
                    <h3 className="title">
                        <div className="date-start">lịch học</div>
                        <div className="sub">*Lịch học và thời gian có thể thống nhất lại theo số đông học viên.</div>
                    </h3>
                    <p>
                        <strong>Ngày bắt đầu: </strong> {data?.data?.opening_time} <br />
                        <strong>Thời gian học: </strong> {data?.data?.schedule}
                    </p>
                    <h3 className="title">Người dạy</h3>
                    <div className="teaches">
                        <div className="teacher">
                            <div className="avatar">
                                <img src={data?.data?.teacher.avatar} alt="" />
                            </div>
                            <div className="info">
                                <div className="name">{data?.data?.teacher.title}</div>
                                <div className="title">{data?.data?.teacher.position}</div>
                                <p className="intro">
                                    {data?.data?.teacher.description}
                                </p>
                                <p><strong>Website:</strong> <a href="#">{data?.data?.teacher.website}</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="user">
                            <img src="/img/user-group-icon.png" alt="" /> {data?.data?.number_student_default} bạn đã đăng ký
                        </div>
                        <Link className="btn main btn-register round" to={path}>đăng ký</Link>
                        <div className="btn-share btn overlay round btn-icon">
                            <img src="/img/facebook.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
           
        </main>
    )
}

export default CourseDetail