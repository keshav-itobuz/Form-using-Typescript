import { FC, SelectHTMLAttributes } from 'react'

const GenericSelect: FC<SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    return (
        <select
            className={`border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer `}
            {...props}
        >
            {props.children}
        </select>
    )
}

export default GenericSelect
