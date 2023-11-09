import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext/ThemeContext";
import AddNewRecipe from "./pages/AddNewRecipe";
import EditRecipe from "./pages/EditRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "./featuress/auth/authSlice";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import PageNotFound from "./components/PageNotFound";
function App() {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(validateUser());
  }, []);

  return (
    <div className={`${theme} w-screen overflow-hidden box-border`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white dark:bg-bg-dark ">
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              {user ? (
                <>
                  <Route path="/add-new-recipe" element={<AddNewRecipe />} />
                  <Route path="/edit/:id" element={<EditRecipe />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
