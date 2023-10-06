import { Configuration, LogLevel } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_ADFS_CLIENT_ID;
const authority = import.meta.env.VITE_ADFS_AUTHORITY;

export const msalConfig: Configuration = {
    auth: {
        clientId,
        authority: `https://${authority}/adfs`,
        knownAuthorities: [authority],
        protocolMode: "OIDC",
    },
    cache: {
        cacheLocation: "sessionStorage",
    },
    system: {
        loggerOptions: {
            // correlationId: "",
            loggerCallback: (
                level: LogLevel,
                message: string,
                containsPii: boolean,
            ) => {
                if (containsPii === true) {
                    return;
                }

                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};
