import { FormData } from '../../interface/interface'
import { useFormContext } from 'react-hook-form'
type PropsType = {
    type: string
    fieldName: string
    label: string
    isRequired: boolean
}
function GenericInput(props: PropsType) {
    const { type, fieldName, isRequired, label } = props
    const {
        register,
        formState: { errors }
    } = useFormContext()


    return (
        <div className="flex flex-col py-2 ">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {label}
                {isRequired && <span className="ms-1 text-red-700">*</span>}
            </p>
            <input
                type={type}
                placeholder={label}
                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                {...register(fieldName as keyof FormData, { required: isRequired })}
            />
            <div className='h-2'>
                {errors && (
                    <span className="text-[0.8rem] text-red-700 ms-1">
                        { errors[fieldName]?.message as string}
                    </span>
                )}
            </div>
        </div>
    )
}

export default GenericInput
