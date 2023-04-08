import { CourseCard, LoadingCourseCard } from '@/components/CourseCard'
import Testimonial from '@/components/Testimonial'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import courseService from '@/services/course'
import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { data, loading } = useQuery({
    queryFn: () => courseService.getList(`?limit=6`)
  })
  return (
    <main className="homepage" id="main">
      <div className="banner jarallax" style={{ backgroundImage: 'url(/img/bg-cover.jpg)', backgroundPosition: 'center', backgroundSize: 'container' }}>
        <div className="container">
          <div className="content">
            <h2 className="title">Thực Chiến</h2>
            <h2 className="title">Tạo ra sản phẩm có giá trị</h2>
            <Link className="btn main round" to={PATH.Course}>KHÓA HỌC</Link>
          </div>
        </div>
        <div className="jarallax-img">
          <img data-src="/img/bg-cover.jpg" alt="" className="lazyload" />
          <div className="video-bg lazyload" data-src="/video/CFD-video-bg2.mp4" />
        </div>
      </div>
      <section className="section-courseoffline">
        <div className="container">
          <p className="top-des">
            Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là
            muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của
            bạn.
          </p>
          <div className="textbox">
            <h2 className="main-title">Khóa học Offline</h2>
          </div>
          <div className="list row">
            {
              loading ? Array.from(Array(6)).map((_, i) => <LoadingCourseCard key={i} />) :
                data?.data?.map(e => <CourseCard key={e.id} {...e} />)
            }
          </div>
        </div>
      </section>
      {/* <section className="section-courseonline section-blue">
        <div className="container">
          <div className="textbox">
            <h2 className="main-title">Khóa học Online</h2>
          </div>
          <div className="list row">
            <div className="col-md-4 course gray">
              <div className="wrap">
                <a className="cover" href="#">
                  <img src="/img/img1.png" alt="" />
                  <div className="hover">
                    <div className="top">
                      <div className="user">
                        <img src="/img/icon-user-white.svg" alt="" />
                        12</div>
                      <div className="heart">
                        <img src="/img/icon-heart.svg" alt="" /> 100
                      </div>
                    </div>
                    <div className="share">
                      <img src="/img/icon-viewmore.svg" alt="" />
                    </div>
                  </div>
                </a>
                <div className="info">
                  <a href="#" className="name">
                    Front-end căn bản
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Trần Nghĩa</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 course gray">
              <div className="wrap">
                <a className="cover" href="#">
                  <img src="/img/img1.png" alt="" />
                  <div className="hover">
                    <div className="top">
                      <div className="user">
                        <img src="/img/icon-user-white.svg" alt="" />
                        12</div>
                      <div className="heart">
                        <img src="/img/icon-heart.svg" alt="" /> 100
                      </div>
                    </div>
                    <div className="share">
                      <img src="/img/icon-viewmore.svg" alt="" />
                    </div>
                  </div>
                </a>
                <div className="info">
                  <a href="#" className="name">
                    Front-end nâng cao
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Trần Nghĩa</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 course gray">
              <div className="wrap">
                <a className="cover" href="#">
                  <img src="/img/img1.png" alt="" />
                  <div className="hover">
                    <div className="top">
                      <div className="user">
                        <img src="/img/icon-user-white.svg" alt="" />
                        12</div>
                      <div className="heart">
                        <img src="/img/icon-heart.svg" alt="" /> 100
                      </div>
                    </div>
                    <div className="share">
                      <img src="/img/icon-viewmore.svg" alt="" />
                    </div>
                  </div>
                </a>
                <div className="info">
                  <a href="#" className="name">
                    Laravel framework
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Trần Nghĩa</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-deco">C</div>
        </div>
      </section> */}
      <section className="section-different">
        <div className="container">
          <div className="row">
            <div className="titlebox col-md-6 col-sm-12 col-xs-12">
              <h2 className="main-title white textleft">Những điều <br /><span>đặc biệt</span> tại CFD</h2>
              <div className="videodif" data-src="video/CFD-video-intro.mp4">
                <img src="/img/img-cfd-dac-biet.jpg" alt="" />
                <div className="play-btn btn-video-intro">
                  <img src="/img/play-icon.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="contentbox col-md-6 col-sm-12 col-xs-12">
              <div className="item">
                <h4>Không cam kết đầu ra</h4>
                <p>Với CFD thì việc cam kết đầu ra nó sẽ không có ý nghĩa nếu như cả người hướng dẫn và
                  người
                  học không thật sự tâm huyết và cố gắng. Vì thế, đội ngũ CFD sẽ làm hết sức để giúp các
                  thành
                  viên tạo ra sản phẩm có giá trị, thay vì cam kết.
                </p>
              </div>
              <div className="item">
                <h4>Không chỉ là một lớp học</h4>
                <p>CFD không phải một lớp học thuần túy, tất cả thành viên là một team, cùng hổ trợ, chia sẻ
                  và
                  giúp đỡ nhau trong suốt quá trình học và sau này, với sự hướng dẫn tận tâm của các thành
                  viên đồng sáng lập.
                </p>
              </div>
              <div className="item">
                <h4>Không để ai bị bỏ lại phía sau</h4>
                <p>Vì chúng ta là một team, những thành viên tiếp thu chậm sẽ được đội ngũ CFD kèm cặp đặc
                  biệt,
                  cùng sự hổ trợ từ các thành viên khác. Vì mục tiêu cuối cùng là hoàn thành
                  khóa
                  học thật tốt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="section-3">
        <div className="container">
          <div className="video">
            <iframe id="video-intro"
              src="https://www.youtube-nocookie.com/embed/6t-MjBazs3o?controls=0&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen allowscriptaccess="always"></iframe>

            <div className="video-src" data-src="video/CFD-video-intro.mp4"></div>
            <div className="play-btn btn-video-intro">
              <img src="/img/play-video-btn.png" alt="" />
            </div>
          </div>
        </div>
      </section> */}
      <Testimonial />

      <section className="section-action">
        <div className="container">
          <h3>Bạn đã sẵn sàng trở thành chiến binh tiếp theo của Team CFD chưa?</h3>
          <Link to={PATH.SignUp} className="btn main round bg-white">Đăng ký</Link>
        </div>
      </section>
    </main>

  )
}

export default Home