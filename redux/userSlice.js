import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "id": 1,
    "fisrtName": "",
    "lastName": "",
    "urlImage": "",
    "email": "",
    "description": "",
    "type": "",
    "totalCases": 0,
    "wonCases": 0,
    "lostCases": 0,
    "isLogin": false,
    "plan" : {
        "name": "",
        "description": "",
        "price": 0
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { id, fisrtName, lastName, urlImage, email, password, description, type, totalCases, winCases, lostCases, isLogin } = action.payload
            state.id = id
            state.fisrtName = fisrtName
            state.lastName = lastName
            state.urlImage = urlImage
            state.email = email
            state.password = password
            state.description = description
            state.type = type
            state.totalCases = totalCases != 0 ? totalCases : 0
            state.winCases = winCases != 0 ? winCases : 0
            state.lostCases = lostCases != 0 ? lostCases : 0
            state.isLogin = isLogin 
        },
        removeUser: (state) => {
            state.fisrtName = ""
            state.lastName = ""
            state.urlImage = ""
            state.email = ""
            state.password = ""
            state.description = ""
            state.type = ""
            state.totalCases = ""
            state.winCases = ""
            state.lostCases = ""
            state.isLogin = false 
        },
        updateUser: (state, action) => {
            const {  fisrtName, lastName, urlImage, email,  description, totalCases, winCases, lostCases} = action.payload
            state.fisrtName = fisrtName
            state.lastName = lastName
            state.urlImage = urlImage
            state.email = email
            state.description = description
            state.totalCases = totalCases != 0 ? totalCases : 0
            state.winCases = winCases != 0 ? winCases : 0
            state.lostCases = lostCases != 0 ? lostCases : 0
        },
        addPlan: (state, action) => {
            const {  name, description, price } = action.payload
            state.plan.name = name
            state.plan.description = description
            state.plan.price = price
        }
    }
})

export const { addUser, removeUser, updateUser, addPlan } = userSlice.actions
export default userSlice.reducer