import React, { useEffect, useState, Fragment } from "react";

import { useHttpClient } from "../../hooks/use-http.js";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIComponents/ErrorModal";
import LoadingSpinner from "../../shared/components/UIComponents/LoadingSpinner";

const UsersPage = () => {
  const [users, setUsers] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+"/users");
        setUsers(response.users);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </Fragment>
  );
};

export default UsersPage;
