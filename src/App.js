import './App.css';
import AuthContextProvider from './context/AuthContext';
import Main from './pages/Main';
import AppRouter from './router/AppRouter';
import Navbar from "./components/Nav"
import { ToastContainer} from "react-toastify";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Navbar />
        <ToastContainer/>
      <AppRouter>
      <Main/>
      </AppRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;

