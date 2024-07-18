type PropsType = {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    optionValues: string[] | number[]
    name: string
    verticalPadding:number
    defaultValue:string | number
}

function GenericSelect(props: PropsType) {
    const { handleChange, optionValues, name , verticalPadding , defaultValue} = props
    return (
        <select
            className={`border border-[#C0CAD4] outline-none py-${verticalPadding} rounded-md px-2 cursor-pointer `}
            name={name}
            onChange={handleChange}
            defaultValue={defaultValue}
        >
            {optionValues.map((value: string | number) => {
                return (
                    <option value={value} key={value}>
                        {typeof value === 'string'
                            ? value[0].toUpperCase() + value.slice(1)
                            : value}
                    </option>
                )
            })}
        </select>
    )
}

export default GenericSelect
