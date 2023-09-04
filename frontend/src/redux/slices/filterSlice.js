const createSlice = require('@reduxjs/toolkit').createSlice;

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        priceRange:[0, 200000],
        ratings: 0
    },
    reducers: {
        setPriceRange(state,action){
            state.priceRange = action.payload

        },
        setRatings(state,action){
            state.ratings = action.payload
        },
        clearFilter(state,action){
            state.priceRange = [0, 200000]
            state.ratings = 0

        }
 
    }
})

export const{setPriceRange,setRatings,clearFilter} = filterSlice.actions
export default filterSlice.reducer
