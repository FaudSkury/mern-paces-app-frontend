import React, { Fragment, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// import NewPlace from "./places/pages/NewPlace";
import PlacesPage from "./places/pages/Places";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UsersPage from "./user/pages/Users";
// import UserPlacesPage from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import AuthPage from "./user/pages/Auth";
import { useAuth } from "./hooks/auth-hook";
import AuthContext from "./context/auth-context.jsx";
import LoadingSpinner from "./shared/components/UIComponents/LoadingSpinner";

const UsersPage = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlacesPage = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const AuthPage = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Fragment>
        <Route path="/" element={<UsersPage />} />
        <Route path="/:userId/places" element={<UserPlacesPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<UsersPage />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/" element={<UsersPage />} />
        <Route path="/:userId/places" element={<UserPlacesPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId: userId }}
    >
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>{routes}</Routes>
        </Suspense>
      </main>
    </AuthContext.Provider>
  );
};

export default App;
