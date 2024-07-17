import { Profession } from "../enum/enum"

export interface FormData {
    id?: string
    name: string
    profession: Profession
    building: string
    city: string
    state: string
    pincode: string
    phone?: string
    email: string
}
