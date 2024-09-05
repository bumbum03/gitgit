const ID_TOKEN_KEY = "auth_token" as string;

export const getToken = (): string | null => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
}

export const saveToken = (Token: string): void => {
    window.localStorage.setItem(ID_TOKEN_KEY, Token);
}

export const destroyToken = (): void => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
