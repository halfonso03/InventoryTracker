type Item = {
    id: number
    description: string
    createdOn: Date
    hbcNumber: string
    computerName: string
    serialNumber: string
    cubicle_Room?: string
    itemTypeId: number
    itemType: string
    initiativeId: number
    initiative?: string
    dateAssigned?: Date | null
    assignedToId: number
    assignedTo?: string | null
    assignedToEmail?: string | null
    assignedToExtension?: string | null
}


type Person = {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    extension: string,
    items: Item[] | null | undefined
}