import { createContext, Dispatch, SetStateAction } from 'react'
import { FormData } from '../interface/interface'
interface ContextInterface {
    employeeInfo: FormData[]
    setEmployeeInfo: Dispatch<SetStateAction<FormData>>
}
export const employeeContext = createContext<ContextInterface | null>(null)
