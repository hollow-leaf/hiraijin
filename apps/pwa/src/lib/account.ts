export const setUserId = async (userId: string) => {
    localStorage.setItem("UserId", userId)
}

export const getUserId = async () => {
    const userId = localStorage.getItem("UserId")
    return userId || ""
}