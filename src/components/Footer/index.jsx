import { PATH } from '@/config/path'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 left">
                        <p className="des">Kiến Thức mở Ra Trang Mới Cuộc Đời Bạn</p>
                        <p className="address">
                            Tòa nhà Robot, 308, Điện Biên Phủ, Phường 4, Quận 3, TP. Hồ Chí Minh
                        </p>
                        <p className="phone">(+84) 949 816 596</p>
                        {/* <div className="social">
                            <a className="fb" href="#">
                                <img src="/img/icon-fb.svg" alt="" />
                            </a>
                            <a className="gmail" href="#">
                                <img src="/img/icon-gmail.svg" alt="" />
                            </a>
                            <a className="skype" href="#">
                                <img src="/img/icon-skype.svg" alt="" />
                            </a>
                        </div> */}
                    </div>
                    <div className="right">
                        <nav>
                            <ul>
                                <li>
                                    <a href="./">Trang chủ</a>
                                </li>
                                <li>
                                    <Link to={PATH.Course}>Khóa Học</Link>
                                </li>
                                <li>
                                    <Link href="#">Thanh toán</Link>
                                </li>
                                <li>
                                    <Link href="#">Điều khoản</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <a href="#" className="back-to-top !top-[110px]">
                    <div className="line" />
                    CUỘN LÊN
                </a>
            </div>
            <div className="copy-right">
                <div className="container">
                    <div className="flex gap-2">
                        2020 spacedev.vn
                        <div className="select flex gap-1 cursor-pointer items-center">
                            <img width={15} src="/img/icon-lang.svg" alt />
                            Tiếng Việt
                            <img src="/img/nav-caret.svg" style={{ marginTop: 13 }} />
                        </div>
                    </div>
                    <p>Được thiết kế và lập trình bởi Spacedev Team</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer