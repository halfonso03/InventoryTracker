type Item = {
    id: number
    description: string
    createdOn: Date
    hbcNumber: string
    computerName?: string
    serialNumber: string
    cubicle_Room?: string
    ipAddress?: string
    itemTypeId: number
    itemType: string
    initiativeId: number
    initiative?: string
    dateAssigned?: Date | null
    assignedToId?: number
    assignedTo?: string | null
    assignedToEmail?: string | null
    assignedToExtension?: string | null,
    itemStatusId: number,
    itemStatus: string,
    disposalDate: Date | null
}


type Person = {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    extension: string,
    items: Item[] | null | undefined,
}

type Initiative = {
    id: number,
    name: string
}