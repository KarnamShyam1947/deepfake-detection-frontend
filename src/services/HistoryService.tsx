import { User } from "@/types/User";

export const getAllUserHistory = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/history/user`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${token}`
        })
    });

    return await response.json();
}

export const addHistoryRecord = async (data) => {
    const token = localStorage.getItem('token');
    console.log(token);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/history/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${token}`
        })
    });

    return response;
}

export const deleteRecord = async (id) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/history/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${token}`
        })
    });

    return await response.json();
}
