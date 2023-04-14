import UploadFile from '@/components/UploadFile'
import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import React, { createContext, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export const ContextAvatar = createContext()

function ProfileLayout() {
    const inputRef = useRef()
    const [file,setFile] = useState()
    const {user} = useAuth()
    const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
    return (
        <main id="main">
            <div className="profile">
                <section>
                    <div className="top-info">
                        <UploadFile onChange={(file) => setFile(inputRef.current = file)}>
                            {(imagePreview,trigger) => (
                                <div className="avatar" onClick={trigger}>
                                    {/* <span class="text">H</span> */}
                                    <img src={imagePreview || user?.avatar || avatarDefault} alt />
                                    <div className="camera" />
                                </div>
                            )}
                        </UploadFile>
                        <div className="name">{user?.name}</div>
                        <p className="des">Thành viên của spacedev từ ngày 20 tháng 10 năm 2022</p>
                    </div>
                    <div className="container">
                        <div className="tab">
                            <div className="tab-title">
                                <NavLink to={PATH.Profile.index}>Thông tin tài khoản</NavLink>
                                <NavLink to={PATH.Profile.MySource}>Khóa học của bạn</NavLink>
                                <NavLink to={PATH.Profile.MyProject}>Dự án đã làm</NavLink>
                                <NavLink to={PATH.Profile.HistoryPayment}>Lịch sử thanh toán</NavLink>
                                <NavLink to={PATH.Profile.CourseView}>Khóa học đã xem</NavLink>
                            </div>
                            <div className="tab-content">
                                <ContextAvatar.Provider value={{file,setFile}}>
                                    <Outlet />
                                </ContextAvatar.Provider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>

    )
}

export default ProfileLayout