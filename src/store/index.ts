import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: false,
        username: "",
        user_id: "",
        role: "",
    },
    getters: {},
    mutations: {
        updateLoggedIn(state, payload) {
            state.loggedIn = payload;
            console.log("Logged in: " + state.loggedIn);
        },
        setUsername(state, payload) {
            state.username = payload;
            console.log("username: " + state.username);
        },
        setUserId(state, payload) {
            state.user_id = payload;
            console.log("user_id: " + state.user_id);
        },
        setRole(state, payload) {
            state.role = payload;
            console.log("role: " + state.role);
        },
    },
    actions: {
        updateLoggedIn({ commit }, payload) {
            commit("updateLoggedIn", payload);
        },
        setUsername({ commit }, payload) {
            commit("setUsername", payload);
        },
        setUserId({ commit }, payload) {
            commit("setUserId", payload);
        },
        setRole({ commit }, payload) {
            commit("setRole", payload);
        },
    },
    modules: {},
});
