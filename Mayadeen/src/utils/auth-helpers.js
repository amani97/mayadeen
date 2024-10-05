export function isLoggedIn() {
    return sessionStorage.getItem("token") ? true : false;
}
