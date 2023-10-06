import "./App.css";
import RequestInterceptor from "./request-interceptor";
import Weather from "./weather";

function App() {
    return (
        <RequestInterceptor>
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>
                    This component demonstrates fetching data from the server.
                </p>
                <Weather />
            </div>
        </RequestInterceptor>
    );
}

export default App;
