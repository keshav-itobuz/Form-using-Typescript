type PropsType = {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    optionValues: string[] | number[]
    name: string
    defaultValue: string | number
}

function GenericSelect(props: PropsType) {
    const { handleChange, optionValues, name, defaultValue } = props
    return (
        <select
            className={`border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer `}
            name={name}
            onChange={handleChange}
            defaultValue={defaultValue}
        >
            {optionValues.map((value: string | number) => {
                return (
                    <option value={value} key={value}>
                        {value}
                    </option>
                )
            })}
        </select>
    )
}

export default GenericSelect
