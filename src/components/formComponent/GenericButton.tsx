import { ButtonHTMLAttributes, FC } from "react"
type propsType = {
    props: ButtonHTMLAttributes<HTMLButtonElement>
}
const GenericButton: FC<propsType> = ({ props }) => {
    return (
        <button
            className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
            {...props}
        >
            {props.children}
        </button>
    )
}

export default GenericButton