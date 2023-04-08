import { PATH } from '@/config/path'
import ProfileLayout from '@/layouts/ProfileLayout'
import Profile from '@/pages/ca-nhan'
import CourseView from '@/pages/ca-nhan/courseView'
import HistoryPayment from '@/pages/ca-nhan/historyPayment'
import MyProject from '@/pages/ca-nhan/myProject'
import MySource from '@/pages/ca-nhan/mySource'
import React from 'react'

export const profile = [
    {
        element: <ProfileLayout />,
        children: [
            {
                element: <Profile />,
                index:true
            },
            {
                element: <MySource />,
                path:PATH.Profile.MySource
            },
            {
                element: <MyProject />,
                path:PATH.Profile.MyProject
            },
            {
                element: <HistoryPayment />,
                path:PATH.Profile.HistoryPayment
            },
            {
                element: <CourseView />,
                path:PATH.Profile.CourseView
            },

        ]
    }
]