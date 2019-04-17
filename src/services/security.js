export function checkAuth(){
    if (localStorage.getItem("apikey") === null) {
        return false
    }
    return true
}