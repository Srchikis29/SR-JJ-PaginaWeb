import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || undefined,
    headers: {
        "Content-Type": "application/json",
    },
});

export class BackendNotConfiguredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BackendNotConfiguredError";
    }
}

export function requireApiEndpoint(endpoint: string | undefined, variableName: string) {
    if (!endpoint) {
        throw new BackendNotConfiguredError(
            `El endpoint ${variableName} no esta configurado. Define la variable en .env cuando exista el backend.`,
        );
    }

    return endpoint;
}