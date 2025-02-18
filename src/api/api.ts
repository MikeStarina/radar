import { API_URL } from "../utils/constants"
import { ProductResponse } from "../utils/types"


// write it with axios/rtk/rq in future
// just 4 test task too lazy fr
const checkResponse = (res: Response) => {
    if (!res.ok) {
        return {
            message: 'something went wrong',
            isSuccess: false
        }
    }

    return { isSuccess: true }
}



export const signInFunc = async (data: { username: string, password: string }): Promise<{ isSuccess: boolean, message?: string }> => {
    try {
        const res = await fetch(`${API_URL}/sign_in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(checkResponse)


        return res;
    } catch (e) {
        // --
        // console.error(e);
        // throw e
        return { isSuccess: false, message: 'An error occurred' };
    }
}


export const signUpFunc = async (data: { username: string, password: string, full_name: string }): Promise<{ isSuccess: boolean, message?: string }> => {
    try {
        const res = await fetch(`${API_URL}/sign_up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(checkResponse);

        return res;
    } catch (e) {
        // --
        // console.error(e);
        // throw e
        return { isSuccess: false, message: 'An error occurred' };
    }
}
export const logout = async (token: string): Promise<{ isSuccess: boolean, message?: string }> => {
    try {
        const res = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            },
        }).then(checkResponse);

        return res;
    } catch (e) {
        // --
        // console.error(e);
        // throw e
        return { isSuccess: false, message: 'An error occurred' };
    }
}

export const getProducts = async ({ token, page = '1' }: { token: string, page?: string | null }): Promise<ProductResponse> => {
    let url = `${API_URL}/get_products/?`;
    if (page) {
        url = url + `page=${page}`;
    }
    const res = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            Authorization: `JWT ${token}`
        }
    }).then(res => res.json())

    return res
}