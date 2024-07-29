import { Profession } from '../enum/professionEnum'

export interface FormData {
    _id?: string
    name: string
    profession: Profession
    building: string
    city: string
    state: string
    pincode: number
    phone?: string
    email: string
}
