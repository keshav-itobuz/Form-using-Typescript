import { FC, InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
const GenericInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={props.name as string}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className="flex flex-col py-2">
                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                        {props.placeholder}
                    </p>
                    <input
                        className=" outline-none font-default-font-family placeholder-[#ABABB2] border-[0.1rem] border-[#C0CAD4] p-[0.8rem] text-[0.9rem] rounded-md"
                        onChange={onChange}
                        value={value}
                        {...props}
                    />
                    <div className="h-1">
                        {error?.message && (
                            <span className="text-[0.8rem] text-red-700 mt-1">
                                {error.message}
                            </span>
                        )}
                    </div>
                </div>
            )}
        />
    )
}

export default GenericInput
