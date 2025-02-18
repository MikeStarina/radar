export const useAuth = () => {

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        console.log(parts)
        // remove hardcode when cors will be fixed
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzM5ODgzNjQxfQ.J41tXWfzTEmhsDfH71UWuJc6jANflAn1RrgCi2Fjs5M'
        //if (parts?.length === 2) return parts.pop().split(';').shift();
    }

    const token = getCookie('token');

    const isAuthenticated = !!token;
    //const isAuthenticated = false; 

    return { isAuthenticated, token };
}