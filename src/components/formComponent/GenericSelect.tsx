type PropsType = {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    optionValues: string[] | number[]
    name: string
}

function GenericSelect(props: PropsType) {
    const { handleChange, optionValues, name } = props
    return (
        <select
            className=" border outline-none py-1 rounded-md px-2 cursor-pointer "
            name={name}
            onChange={handleChange}
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
