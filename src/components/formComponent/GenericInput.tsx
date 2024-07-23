import { FC, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
const GenericInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <div className="flex flex-col py-2">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {props.placeholder}
            </p>
            <input
                className=" outline-none font-default-font-family placeholder-[#ABABB2] border-[0.1rem] border-[#C0CAD4] p-[0.8rem] text-[0.9rem] rounded-md"
                {...register(props.name!)}
                {...props}
            />
            <div className="h-1">
                {errors[props.name!]?.message && (
                    <span className="text-[0.8rem] text-red-700 mt-1">
                        {errors[props.name!]?.message as string}
                    </span>
                )}
            </div>
        </div>
    )
}

export default GenericInput
