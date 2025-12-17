export const loginAPICall = async (requestBody) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    });

    return await response.json();
}

export const registerAPICall = async (requestBody) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    });

    return await response.json();
}

export const forgotPasswordAPICall = async (email: String) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({"email": email}),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    });

    return await response.json();
}

export const setPasswordAPICall = async (token: String, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/set-password`, {
        method: 'POST',
        body: JSON.stringify({token, password}),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    });

    return await response.json();
}

export const resendVerificationAPICall = async () => {
    const email = localStorage.getItem("tempEmail");
    localStorage.removeItem("tempEmail");

    if(!email) {
        throw new Error("Something went wrong, please try again after sometime")
    }
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/resend-activation?email=${email}`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': "application/json"
        })
    });

    return await response.json();
}


