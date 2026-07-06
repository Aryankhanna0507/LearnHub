import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer.js"
import { authApi } from "../feature/api/authApi"
import { courseApi } from "@/feature/api/courseApi.js";
import { purchaseApi } from "@/feature/api/purchaseApi.js";
import { courseProgressApi } from "@/feature/api/coursePrgressApi.js";

// Redux store setup
export const appStore = configureStore({
  reducer: rootReducer,

  // RTK Query middleware add (important for API caching, fetching)
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware)
})
const initializeApp = async () => {
  try {
    await appStore.dispatch(
      authApi.endpoints.loadUser.initiate(undefined, {
        forceRefetch: true,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
initializeApp();