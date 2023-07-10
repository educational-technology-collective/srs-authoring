import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = () => {
    logout({ logoutParams: { returnTo: window.location.origin + "/index.html" } });
  };

  return <button onClick={handleClick}>Log Out</button>;
};

export { LogoutButton };
