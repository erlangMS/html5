export declare class CookieService {
    constructor();
    getCookie(name: string): string;
    deleteCookie(name: string): void;
    private setCookieForRemove(name, value, expireMilisecounds);
    setCookie(name: string, value: string, expireMilisecounds: number, path: string, domain: string, secure: boolean): void;
}
