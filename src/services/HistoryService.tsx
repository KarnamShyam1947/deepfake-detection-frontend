import { User } from "@/types/User";

export const getAllUserHistory = async () => {
    const savedUser: User = JSON.parse(localStorage.getItem('user'));
    console.log(savedUser);
    
    const response = await fetch(`http://localhost:8084/api/v1/history/user/${savedUser.id}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${savedUser.jwtToken}`
        })
    });

    return await response.json();
}

export const deleteRecord = async (id) => {
    const savedUser: User = JSON.parse(localStorage.getItem('user'));
    console.log(savedUser);

    const response = await fetch(`http://localhost:8084/api/v1/history/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${savedUser.jwtToken}`
        })
    });

    return await response.json();
}
