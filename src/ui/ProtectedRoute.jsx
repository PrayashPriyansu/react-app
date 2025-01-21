import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  display: flex;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the Authenticated User
  //When we initially login we have access to user data but with subsequent reload we dont have access to that use data so we need to load the user

  const { user, isLoading, isAuthenticated, isFetching } = useUser();

  //2. If there is no authenticated user, redirect to the login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate, isFetching]
  );

  //3. While loading , show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is an user render the app
  if (isAuthenticated) return children;
}
export default ProtectedRoute;
