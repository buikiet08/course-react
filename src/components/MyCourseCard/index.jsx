import { withListLoading } from "@/utils/withListLoading"
import { Skeleton } from "../Skeleton"

export const MySourceCard = ({course,total_hours,video,student,process}) => {
    return (
        <div className="item">
            <div className="cover">
                <img src={course?.thumbnailUrl} alt />
            </div>
            <div className="info">
                <a href="#" className="name">
                    {course?.title}
                </a>
                <div className="date">Khai giảng ngày {course?.opening_time}</div>
                <div className="row">
                    <div>
                        <img src="/img/clock.svg" alt className="icon" />{total_hours} giờ
                    </div>
                    <div>
                        <img src="/img/play.svg" alt className="icon" />{video} video
                    </div>
                    <div>
                        <img src="/img/user.svg" alt className="icon" />{student} học viên
                    </div>
                </div>
                <div className="process">
                    <div className="line">
                        <div className="rate" style={{ width: `${process}%` }} />
                    </div>
                    {process}%
                </div>
                <div className="btn overlay round btn-continue">
                    Tiếp tục học
                </div>
            </div>
        </div>
    )
}


export const MySourceCardLoading = () => {
    return (
        <div className="item">
            <div className="cover">
                <Skeleton height={249} />
            </div>
            <div className="info">
                <Skeleton height={30} />
                <br />
                <Skeleton height={20} />

                <div className="row">
                    <div>
                        <Skeleton height={20} width={40} />
                    </div>
                    <div>
                        <Skeleton height={20} width={40} />
                    </div>
                    <div>
                        <Skeleton height={20} width={40} />
                    </div>
                </div>
                <div className="process">
                    <Skeleton height={5} />
                </div>
                <br />
                <Skeleton height={40} width={120} />
            </div>
        </div>
    )
}

export const ListMyCourseLoading = withListLoading(MySourceCard, MySourceCardLoading)