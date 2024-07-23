import { FC, SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

const GenericSelect: FC<SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    const { register } = useFormContext()
    return (
        <select
            className={`border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer h-full`}
            {...props}
            {...register(props.name!)}
        >
            {props.children}
        </select>
    )
}

export default GenericSelect
