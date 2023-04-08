import React from 'react'
import { Link, generatePath } from 'react-router-dom'
import { Skeleton } from '../Skeleton'
import { withListLoading } from '@/utils/withListLoading'
import { PATH } from '@/config/path'
import { currency } from '@/utils/currency'

export const CourseCard = ({ id, thumbnailUrl,money, title, short_description, teacher, slug }) => {
    const path = generatePath(PATH.CourseDetail, {id})
    const pathRegister = generatePath(PATH.CourseRegister, {id})

    return (
        <div className="col-md-4 course">
            <div className="wrap">
                <Link className="cover" to={path}>
                    <img src={`${thumbnailUrl}`} alt="" />
                </Link>
                <div className="info">
                    <Link className="name" to={path}>
                        {title}
                    </Link>
                    <p className="des">
                        {short_description}
                    </p>
                </div>
                <div className="bottom">
                    <div className="teacher">
                        <div className="avatar" style={{ height: 36 }}>
                            <img src={`${teacher?.avatar}`} alt="" />
                        </div>
                        <div className="name">{teacher?.title}</div>
                    </div>
                    <Link className="register-btn" to={pathRegister}>Đăng ký</Link>
                </div>
            </div>
        </div>
    )
}
export const LoadingCourseCard = () => {
    return (
        <div className="col-md-4 course">
            <div className="wrap">
                <Skeleton height={227.5} />
                <div className="info">
                    <Skeleton height={30} width='70%' />
                    <br />
                    <Skeleton height={50} />
                </div>
                <div className="bottom">
                    <div className="teacher">
                        <Skeleton height={40} width={140} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const LoadingListCourse = withListLoading(CourseCard, LoadingCourseCard)