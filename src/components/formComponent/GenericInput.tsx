type PropsType = {
    type: string
    placeholder: string
    name: string
    value?: string
    label: string
    isRequired: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement>
}
function GenericInput(props: PropsType) {
    return (
        <div className="flex flex-col gap-1 py-2 ">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {props.label}
                {props.isRequired && (
                    <span className="ms-1 text-red-700">*</span>
                )}
            </p>
            <input
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
            />
        </div>
    )
}

export default GenericInput
