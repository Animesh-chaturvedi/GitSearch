import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRoutes,
} from "react-router-dom";
import Favourites from "./screens/Favourites";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import store from "./redux/store"
import NavBar from "./components/NavBar"
import ErrorBoundary from "./ErrorBoundry";
const Apps = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/favourites", element: <Favourites /> },
  ]);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <ErrorBoundary>
          <Apps />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
