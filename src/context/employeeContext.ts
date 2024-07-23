import { createContext, Dispatch, SetStateAction } from 'react'
import { FormData } from '../interface/interface'
export interface EmployeeContext {
    employeeInfo: FormData[]
    setEmployeeInfo: Dispatch<SetStateAction<FormData>>
}
export const Context = createContext<Partial<EmployeeContext>>({})
