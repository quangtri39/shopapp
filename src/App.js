import "./App.css";
import { useAuth } from "./Contexts/AuthContext";
import FullPageProgress from "./Components/FullPageProgress/FullPageProgress";
import AuthenticatedApp from "./Components/AuthenticatedApp/AuthenticatedApp";
import UnauthenticatedApp from "./Components/UnauthenticatedApp/UnauthenticatedApp";

function App() {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) return <FullPageProgress size={100} />;
  if (currentUser) {
    return <AuthenticatedApp />;
  } else {
    return <UnauthenticatedApp />;
  }
}

export default App;
