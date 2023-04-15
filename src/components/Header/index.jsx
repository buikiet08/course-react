import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import { logoutThunkAction } from '@/store/authReducer'
import { handleError } from '@/utils/handleError'
import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Header() {
    const { user } = useAuth()
    const dispatch = useDispatch()
    // tắt menu khi chuyển page
    const {pathname} = useLocation()
    useEffect(() => {
        onCloseMenu()
    }, [pathname])


    const onLogout = async (ev) => {
        ev.preventDefault()
        try {
            await dispatch(logoutThunkAction()).unwrap();
            message.success('Đăng xuất thành công')
        } catch (error) {
            handleError(error)
        }
    }
    const onOpenMenu = () => {
        document.body.classList.toggle('menu-is-show')
    }

    const onCloseMenu = () => {
        document.body.classList.remove('menu-is-show')
    }
    const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
    return (
        <>
            <header id="header">
                <div className="wrap">
                    <div className="menu-hambeger" onClick={onOpenMenu}>
                        <div className="button">
                            <span />
                            <span />
                            <span />
                        </div>
                        <span className="text">menu</span>
                    </div>
                    <Link to={PATH.Home} className="logo">
                        <img src="/img/logo.svg" alt />
                        <h1>Spacedev</h1>
                    </Link>
                    <div className="right">
                        {
                            user ? (
                                <div className="have-login">
                                    <div className="account">
                                        <div className="info">
                                            <div className="name">{user?.name}</div>
                                            <div className="avatar">
                                                <img src={user?.avatar || avatarDefault} alt />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hamberger">
                                    </div>
                                    <div className="sub">
                                        <Link to={PATH.Profile.MySource}>Khóa học của tôi</Link>
                                        <Link to={PATH.Profile.index}>Thông tin tài khoản</Link>
                                        <Link onClick={onLogout}>Đăng xuất</Link>
                                    </div>
                                </div>
                            ) : (
                                <div class="not-login bg-none">
                                    <Link to={PATH.SignIn} class="btn-register">Đăng nhập</Link>
                                    <Link to={PATH.SignUp} class="btn main btn-open-login">Đăng ký</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="progress" />
            </header>
            <div className="overlay_nav" onClick={onCloseMenu}></div>
            <nav className="nav">
                <ul>
                    {
                        !user ? (
                            <li>
                                <NavLink to={PATH.SignIn}>Đăng ký / Đăng nhập</NavLink>
                            </li>
                        ) : (
                            <li>
                                <NavLink to={PATH.Profile.index} className="account">
                                    <div className="avatar">
                                        <img src={user?.avatar || avatarDefault} alt />
                                    </div>
                                    <div className="name">{user?.name}</div>
                                </NavLink>
                            </li>
                        )
                    }
                    <li>
                        <NavLink to={PATH.Home}>Trang chủ</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to={PATH.Team}>Spacedev Team</NavLink>
                    </li> */}
                    <li>
                        <NavLink to={PATH.Course}>Khóa Học</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.Project}>Dự Án</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.Contact}>Liên hệ</NavLink>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export default Header