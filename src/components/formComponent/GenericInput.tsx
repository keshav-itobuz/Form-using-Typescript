type PropsType = {
    type: string
    placeholder: string
    name: string
    value?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}
function GenericInput(props: PropsType) {
    return (
        <div>
            <input
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className=" border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]"
            />
        </div>
    )
}

export default GenericInput
