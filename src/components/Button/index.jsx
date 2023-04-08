import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

function Button({children,loading,disabled,...props}) {
  return (
    <button className={`btn rect main btn-login flex items-center ${loading && 'cursor-not-allowed'}`} disabled={disabled} {...props}>{loading && <LoadingOutlined className='mr-2' />} {children}</button>
  )
}

export default Button