export function checkAuth(){
    if (localStorage.getItem("apikey") === null) {
        return false
    }
    return true
}

export function singout(){
    localStorage.removeItem("id")
    localStorage.removeItem("apikey")
    localStorage.removeItem("verify")
}