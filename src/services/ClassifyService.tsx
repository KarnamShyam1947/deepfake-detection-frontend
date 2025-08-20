import { User } from "@/types/User";

export const sendClassifyEvent = async (url, bytes, original_filename, format, duration) => {
    try {
        const savedUser: User = JSON.parse(localStorage.getItem('user'));
        console.log(savedUser);
    
        const reqData = {
            url: url,
            size: `${bytesToMB(bytes)} MB`,
            filename: `${original_filename}.${format}`,
            duration: `${duration} Sec.`
        };
        console.log(reqData);
    
        duration = duration.toFixed(2);
        const resp = await fetch(`http://localhost:8083/api/v1/classify`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${savedUser.jwtToken}`
            }),
            body: JSON.stringify(reqData)
        })
    
        return await resp.json();   
    } catch (error) {
        console.log(error);
    }

}

function bytesToMB(bytes, decimals = 2, useBinary = true) {
    const divisor = useBinary ? 1024 * 1024 : 1000 * 1000;
    const mb = bytes / divisor;
    return parseFloat(mb.toFixed(decimals));
}

