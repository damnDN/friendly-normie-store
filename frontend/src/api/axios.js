import axios from "axios";

let store;

// Inject store dynamically from your main entry file to prevent import circular loops
export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request Interceptor: Pull token directly out of Redux State
api.interceptors.request.use((config) => {
  const token = store?.getState().auth.accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Refresh and push new token back into Redux State
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.data?.code === "TOKEN_EXPIRED" &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/v1/users/refresh`,
//           {},
//           { withCredentials: true },
//         );

//         const { accessToken } = res.data;

//         // Extract current user and update Redux with the new access token
//         const currentUser = store.getState().auth.user;
//         const { setCredentials } =
//           await import("../redux/features/auth/authSlice.js"); // Dynamic import
//         store.dispatch(setCredentials({ user: currentUser, accessToken }));

//         originalRequest.headers = {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${accessToken}`,
//         };
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh token invalid -> wipe state and boot to login
//         const { logOut } = await import("../redux/features/auth/authSlice.js");
//         store.dispatch(logOut());
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Never try to refresh the refresh endpoint itself, damn it.
    if (originalRequest?.url?.includes("/api/v1/users/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = res.data;

        const currentUser = store.getState().auth.user;

        const { setCredentials } =
          await import("../redux/features/auth/authSlice.js");

        store.dispatch(
          setCredentials({
            user: currentUser,
            accessToken,
          }),
        );

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        const { logOut } = await import("../redux/features/auth/authSlice.js");

        store.dispatch(logOut());

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
