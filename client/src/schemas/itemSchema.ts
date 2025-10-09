import * as Yup from 'yup';

export interface ItemFormSchema {
    id: number
    description: string
    hbcNumber: string
    computerName?: string | undefined
    itemTypeId: number
    assignedToId?: number | null | undefined
    serialNumber?: string | null | undefined
    ipAddress?: string | null | undefined
    initiativeId?: number | undefined | null
    cubicle_Room?: string | null | undefined,
}


export interface ItemFormData {
    id: number
    description: string
    hbcNumber: string
    computerName?: string | undefined
    itemTypeId?: number
    assignedToId?: number | null
    serialNumber?: string | null
    ipAddress?: string | null
    initiativeId?: number | undefined | null
    cubicle_Room?: string | null,


    // serialNumber: string
    // cubicle_Room?: string
    // itemTypeId: number
    // initiativeId: number
    // assignedToId: number
}





export const itemFormSchema = Yup.object().shape({
    id: Yup.number().required("*"),
    description: Yup.string().required('*'),
    itemTypeId: Yup.mixed().not(['0', 0, ''], "*"),
    hbcNumber: Yup.string().required('*'),
    computerName: Yup.string().when('itemTypeId', {
        is: (val: number | string) => {
            try {
                return +val == 1 || +val == 2;
            } catch {
                return false;
            }
        },
        then: (schema) => schema.required('*'),
        otherwise: () => Yup.string().nullable(),
    }),
    assignedToId: Yup.number().optional().nullable(),
    cubicle_Room: Yup.string().nullable(),
    initiativeId: Yup.number().nullable(),
    serialNumber: Yup.string().nullable(),
    ipAddress: Yup.string().nullable()
})


