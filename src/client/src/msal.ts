import {
    AuthenticationResult,
    EventType,
    PublicClientApplication,
} from "@azure/msal-browser";
import { msalConfig } from "./msal-config";

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.payload === null) {
        return;
    }

    if (event.eventType === EventType.LOGIN_SUCCESS) {
        const { account } = event.payload as AuthenticationResult;

        if (typeof account === "undefined" || account === null) {
            return;
        }

        msalInstance.setActiveAccount(account);
    }
});

export { msalInstance };
