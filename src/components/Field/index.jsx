import { cn } from '@/utils'
import React, { memo, useId } from 'react'
import { ErrorStyle, FieldStyle } from './style'

function Field({label,error,renderField,onChange,...props}) {
    console.log('test field', props.value)
    const id = useId()

    const _onChange = (ev) => {
        onChange?.(ev.target.value)
    }
    return (
        <FieldStyle className={cn('form-group w-full relative', {error})}>
            {label && <label className="sr-only" htmlFor={id}>
                {label}
            </label>}
            {
                renderField ? renderField({...props,label,error,onChange,id}) : <input onChange={_onChange} className="form-control w-full form-control-sm !mb-0" {...props} />
            }
            {error && <ErrorStyle>{error}</ErrorStyle>}
        </FieldStyle>
    )
}

export default memo(Field, (oldProps, newProps) => {
    return oldProps.value === newProps.value && oldProps.error === newProps.error
})