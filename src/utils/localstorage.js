let db = {
    save(key, value) {
        console.log(JSON.stringify(value))
        if(JSON.stringify(value)){
            localStorage.setItem(key, JSON.stringify(value))
        }
        
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}

export default db