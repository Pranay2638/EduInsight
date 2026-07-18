export const saveAuth = (response: any) => {

    localStorage.setItem(
        "token",
        response.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.user)
    );

};