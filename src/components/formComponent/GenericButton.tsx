import { ButtonHTMLAttributes, FC } from 'react'

const GenericButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            className={`w-[100%] bg-[#1444EF] border border-[#1444EF] text-white p-3 hover:bg-transparent hover:text-[#1444EF] rounded-md  text-[0.9rem] ${props.className}`}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default GenericButton
