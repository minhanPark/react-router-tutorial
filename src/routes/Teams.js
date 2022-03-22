import { Outlet } from "react-router-dom";

const Teams = () => {
  return (
    <div>
      <h2>팀즈(팀목록)</h2>
      <Outlet />
    </div>
  );
};

export default Teams;
