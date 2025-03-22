// import "./App.css";
// import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import Auth from "./pages/Authentication/Auth";
// import Home from "./pages/Home/Home";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/auth" element={<Auth></Auth>}></Route>
//           <Route path="*" element={<Navigate to="/auth" />}></Route>
//           <Route path="/home" element={<Home></Home>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Auth from "./pages/Authentication/Auth";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
