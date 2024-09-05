import { ref } from "vue";
import { defineStore } from "pinia";
import jwtService from "../core/services/jwtService";
import ApiService from "../core/services/apiService";

export interface User {
    id: number
    uuid: string;
    nama: string;
    email: string;
    nomor: string;
    password?: string;
    permission: Array<string>;
    role?: {
        name: string;
        full_name: string;
    }
}

export const useAuthStore = defineStore("auth", () => {
    const error = ref<null | string>(null);
    const user = ref<User>({} as User);
    const isAutheticated = ref(false);

    function setAuth(authUser: User, token = "") {
        isAutheticated.value = true;
        user.value = authUser;
        error.value = null;

        if (token) {
            jwtService.saveToken(token);
        }
    }

    function purgeAuth() {
        isAutheticated.value = false;
        user.value = {} as User;
        error.value =null;
        jwtService.destroyToken();
    }

    async function login(credentials: User) {
        return ApiService.post("auth/login", credentials)
        .then(({ data }) => {
            setAuth(data.user, data.token);
        })
        .catch(({ Response }) => {
            error.value = Response.data.message;
        });
    }

    async function logout() {
        if (jwtService.getToken()) {
            ApiService.setHeader();
            await ApiService.delete("auth/logout");
            localStorage.removeItem('lastWeb')
            purgeAuth();
        } else {
            purgeAuth();
        }
    }

    async function verifyAuth() {
        if (jwtService.getToken()) {
            ApiService.setHeader();
            await ApiService.get("auth/me")
            .then(({ data }) => {
                setAuth(data.user);
            })
            .catch(({ Response }) => {
                error.value = Response.data.message;
                purgeAuth();
            });
        } else {
            purgeAuth();
        }
    }

    return {
        error,
        user,
        isAutheticated,
        login,
        logout,
        verifyAuth,
        setAuth,
        purgeAuth,
    };
});
