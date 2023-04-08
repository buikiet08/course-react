import { MySourceCard, MySourceCardLoading } from '@/components/MyCourseCard'
import { useQuery } from '@/hooks/useQuery'
import courseService from '@/services/course'
import React from 'react'

function MySource() {
    const {data,loading} = useQuery({
        queryFn: () => courseService.myCourse()
    })
    return (
        <div className="tab2">
            {
                loading ? <MySourceCardLoading /> : 
                data?.data?.map(e => <MySourceCard key={e._id} {...e} />)
            }
        </div>

    )
}

export default MySource