import customAxios from "../utils/customAxios"
type propsType = {
    formdata: FormData[]
}
function EmployeeCard(props: propsType) {
    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`delete-employee?id=${id}`)
            const filterData = props.formdata.filter((item) => {
                return item._id !== id
            })
            setEmployeeInfo(filterData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className=" h-[72vh] overflow-y-scroll no-scrollbar]">
                {employeeInfo.map((data, index) => (
                    <div
                        className=" grid grid-cols-12 bg-white border py-4"
                        key={index}
                    >
                        <span className="col-span-2 ms-3 truncate">
                            {data?.name[0].toLocaleUpperCase() +
                                data?.name.slice(1)}{' '}
                        </span>
                        <span className="col-span-5 pe-3">{`${data?.building} ${data?.city} ${data?.state} - ${data?.pincode}`}</span>
                        <span className="col-span-2 truncate pe-2">
                            {data?.email}
                        </span>
                        <span className="col-span-2 truncate">
                            {!data?.phone ? '---' : data?.phone}
                        </span>
                        <span className="col-span-1 flex gap-8">
                            <span
                                className=" cursor-pointer"
                                onClick={() => {
                                    data._id && handleEdit(data._id)
                                }}
                            >
                                <MdEdit />
                            </span>
                            <span
                                className=" cursor-pointer"
                                onClick={() => {
                                    confirmAlert(() => {
                                        data._id && handleDelete(data._id)
                                    })
                                }}
                            >
                                <FaTrashAlt />
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default EmployeeCard