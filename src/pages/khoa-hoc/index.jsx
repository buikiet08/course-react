import { LoadingListCourse } from '@/components/CourseCard'
import Paginate from '@/components/Paginate/Paginate'
import { useCurrentPage } from '@/hooks/useCurrentPage'
import { useQuery } from '@/hooks/useQuery'
import courseService from '@/services/course'
import queryString from 'query-string'
import React from 'react'

function Course() {
    const currentPage = useCurrentPage()
    const qs = queryString.stringify({
        page: currentPage,
        limit: 9
    })
    const {data,loading} = useQuery({
        queryKey: [qs],
        keepPrivousData : true,
        queryFn: ({signal}) => courseService.getList(`?${qs}`, signal)
    })
    return (
        <main id="main">
            <section className="section-1">
                <div className="container">
                    <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
                    <p className="top-des">
                        Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là
                        muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của
                        bạn.
                    </p>
                    <div className="textbox" style={{ marginTop: 100 }}>
                        <h3 className="sub-title">KHÓA HỌC</h3>
                        <h2 className="main-title">OFFLINE</h2>
                    </div>
                    <div className="flex justify-between items-center mt-10 mb-10">
                        {/* <div className="category">
                            <a href="#" className="item active">Cất cả</a>
                            <a href="#" className="item">Frontend</a>
                            <a href="#" className="item">Backend</a>
                            <a href="#" className="item">UI/UX</a>
                            <a href="#" className="item">Devops</a>
                        </div>
                        <div className="flex">
                            <div className="input-search">
                                <input defaultValue="Reactjs" />
                                <button>Tìm kiếm</button>
                            </div>
                        </div> */}
                    </div>
                    <div className="list row">
                        <LoadingListCourse 
                            data={data?.data}
                            loadingCount={3}
                            loading={loading}
                        />
                    </div>
                    <div className="flex justify-end mt-10">
                        {/* Pagination */}
                        <Paginate totalPage={data?.paginate?.totalPage} />
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Course