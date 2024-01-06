import { configureStore } from '@reduxjs/toolkit'
import {reducer} from './reducer'

export const store = configureStore({
  reducer: reducer,
})


// now let connect this store to react app 
//