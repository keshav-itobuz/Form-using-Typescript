import { createContext, useContext, useState } from 'react'
import { FormData } from '../interface/interface'
import axiosInstance from '../utils/axiosInstance'
interface ContextInterface {
    employeeInfo: FormData[]
    getEmployeeInfo: (
        profession: string,
        page: number,
        limit: number,
        searchedName: string
    ) => void
    totalRecord: number
}
const EmployeeContext = createContext<ContextInterface | null>(null)

const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [totalRecord, setTotalRecord] = useState<number>(1)

    const getEmployeeInfo = async (
        profession: string,
        page: number,
        limit: number,
        searchedName: string
    ) => {
        try {
            const { data } = await axiosInstance.get(
                `get-employee?profession=${profession}&page=${page}&limit=${limit}&searchedName=${searchedName}`
            )
            if (data) {
                setEmployeeInfo(data.employeeData)
                setTotalRecord(data.total)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <EmployeeContext.Provider
            value={{ employeeInfo, getEmployeeInfo, totalRecord }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}

const useEmployee = () => {
    return useContext(EmployeeContext)
}

export { EmployeeProvider, useEmployee }
