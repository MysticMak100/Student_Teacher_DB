// Current code snippet
import create from "zustand";

const useAuth = create((set) => ({
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
  setAuth: (auth) => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
    set(() => ({ auth }));
  },
}));

export default useAuth;
