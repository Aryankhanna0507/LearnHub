import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer.js"
import { authApi } from "../feature/api/authApi"

// Redux store setup
export const appStore = configureStore({
  reducer: rootReducer,

  // RTK Query middleware add (important for API caching, fetching)
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware)
})