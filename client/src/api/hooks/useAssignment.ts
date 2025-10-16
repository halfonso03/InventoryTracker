import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import agent from "../agent";
import type { AssigneeFormData } from "../../schemas/personSchema";


const useAssignments = () => {
    const { mutate: createAssignee } = useMutation({
        mutationFn: async (data: AssigneeFormData) => {
            const response = await agent.post(`inventory/assignee/add`, data)
            return response.data;
        },
        onSuccess: (assignment: Person) => {
            console.log('assignment', assignment)
            toast.success('Assignee Added');
        }
    })

    return { createAssignee }
}


export default useAssignments;