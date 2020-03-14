const addPrefix = (key: string) => `launch-kit-frontend.${key}`;

const adBlockMessageShownKey = addPrefix('adBlockMessageShown');
const walletConnectedKey = addPrefix('walletConnected');

export class LocalStorage {
    private readonly _storage: Storage;

    constructor(storage: Storage = localStorage) {
        this._storage = storage;
    }

    public saveAdBlockMessageShown(adBlockMessageShown: boolean): void {
        this._storage.setItem(adBlockMessageShownKey, JSON.stringify(adBlockMessageShown));
    }

    public getAdBlockMessageShown(): boolean {
        return JSON.parse(this._storage.getItem(adBlockMessageShownKey) || 'false');
    }

    public saveWalletConnected(walletConnected: boolean): void {
        this._storage.setItem(walletConnectedKey, JSON.stringify(walletConnected));
    }

    public getWalletConnected(): boolean {
        return JSON.parse(this._storage.getItem(walletConnectedKey) || 'false');
    }
}
