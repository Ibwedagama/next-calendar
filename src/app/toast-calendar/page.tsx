import dynamic from 'next/dynamic'
import React from 'react'

const ToastCalendar = dynamic(() => import('@/components/ToastCalendar'), {
  ssr: false
})

const page = () => {
  return <ToastCalendar />
}

export default page
