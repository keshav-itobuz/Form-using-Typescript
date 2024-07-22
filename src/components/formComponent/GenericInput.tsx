import { FC, InputHTMLAttributes } from 'react'
import { FormData } from '../../interface/interface'
import { useFormContext } from 'react-hook-form'
type PropsType = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    isRequired: boolean
}
const GenericInput: FC<PropsType> = ({ label, isRequired, ...props }) => {
    const {
        register,
        formState: { errors }
    } = useFormContext()


    return (
        <div className="flex flex-col py-2">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {label}
                {isRequired && <span className="ms-1 text-red-700">*</span>}
            </p>
            <input
                placeholder={label}
                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                {...register(props.name as keyof FormData, { required: isRequired })}
                {...props}
            />
            <div className='h-1'>
                {errors[props.name as keyof FormData]?.message && (
                    <span className="text-[0.8rem] text-red-700 mt-1">
                        {errors[props.name as keyof FormData]?.message as string}
                    </span>
                )}
            </div>

        </div>
    )
}

export default GenericInput
