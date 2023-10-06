import { MsalAuthenticationTemplate } from "@azure/msal-react";
import "./App.css";
import RequestInterceptor from "./request-interceptor";
import Weather from "./weather";
import { InteractionType, SilentRequest } from "@azure/msal-browser";

function App() {
    const domainHint = import.meta.env.VITE_ADFS_DOMAIN_HINT;
    const authRequest: SilentRequest = {
        extraQueryParameters: {
            domain_hint: domainHint,
        },
        scopes: ["openid", "user_impersonation"],
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <RequestInterceptor>
                <div>
                    <h1 id="tabelLabel">Weather forecast</h1>
                    <p>
                        This component demonstrates fetching data from the server.
                    </p>
                    <Weather />
                </div>
            </RequestInterceptor>
        </MsalAuthenticationTemplate>
    );
}

export default App;
