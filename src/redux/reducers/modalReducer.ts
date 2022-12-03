import { createSlice } from '@reduxjs/toolkit'

interface modalInterface {
    modalIsOpen: boolean
}

const initialState: modalInterface = {
    modalIsOpen: false,
}

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        change: (state) => {
            state.modalIsOpen = !state.modalIsOpen
        }
    }
})



export const { change } = modalReducer.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default modalReducer.reducer
