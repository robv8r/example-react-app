import { useAccount, useMsal } from "@azure/msal-react";
import { ReactNode } from "react";
import axios from "axios";

interface RequestInterceptorProps {
    children: ReactNode;
}

const domainHint = import.meta.env.VITE_ADFS_DOMAIN_HINT;

function RequestInterceptor({ children }: RequestInterceptorProps) {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0]);
    axios.interceptors.request.use(async (config) => {
        if (!account) {
            throw Error("No active account! Verify a user has been signed in.");
        }

        const response = await instance.acquireTokenSilent({
            account,
            scopes: ["openid"],
            extraQueryParameters: {
                domain_hint: domainHint,
            },
        });

        const bearer = `Bearer ${response.accessToken}`;
        config.headers.Authorization = bearer;

        return config;
    });

    return <>{children}</>;
}

export default RequestInterceptor;
export type { RequestInterceptorProps };
