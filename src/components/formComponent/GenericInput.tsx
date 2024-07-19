import { FormData } from '../../interface/interface'
import { UseFormRegister } from 'react-hook-form'
type PropsType = {
    type: string
    placeholder: string
    name: string
    label: string
    isRequired: boolean
    register: UseFormRegister<FormData>
}
function GenericInput(props: PropsType) {
    const { register, type, placeholder, name, isRequired, label } = props
    return (
        <div className="flex flex-col py-2 ">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {label}
                {isRequired && <span className="ms-1 text-red-700">*</span>}
            </p>
            <input
                type={type}
                placeholder={placeholder}
                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                {...register(name as keyof FormData, { required: isRequired })}
            />
        </div>
    )
}

export default GenericInput
