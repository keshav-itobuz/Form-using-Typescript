import * as yup from 'yup'
import { Profession } from '../enum/professionEnum'

const employeeSchema = yup.object().shape(
    {
        _id: yup.string(),
        name: yup
            .string()
            .required('required')
            .trim()
            .min(2, 'Minimum 2 characters required'),
        phone: yup.string().when('phone', (val) => {
            if (val[0]?.length > 0) {
                return yup
                    .string()
                    .min(10, 'min 10 digits')
                    .max(10, 'max 10 digits')
                    .required('required')
            } else {
                return yup.string().optional()
            }
        }),
        building: yup.string().required('required'),
        profession: yup
            .string()
            .oneOf(Object.values(Profession), 'Invalid profession')
            .required('required'),
        city: yup.string().required('required'),
        state: yup.string().required('required'),
        pincode: yup
            .number()
            .required('required')
            .test(
                'len',
                'Must be exactly 6 characters',
                (val) => val.toString().length === 6
            ),
        email: yup.string().email('Invalid email').required('required'),
    },
    [['phone', 'phone']]
)

export default employeeSchema
