import { Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./routes/About";
import AboutMenu from "./routes/AboutMenu";
import Home from "./routes/Home";
import HomeMenu from "./routes/HomeMenu";
import LeagueStanding from "./routes/LeagueStanding";
import NewTeamForm from "./routes/NewTeam";
import NotFound from "./routes/NotFound";
import Team from "./routes/Team";
import Teams from "./routes/Teams";

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/teams");
  };
  return (
    <div>
      <h1>리액트 라우터 튜토리얼</h1>
      <div>
        <nav>
          <Link style={{ marginRight: 5 }} to="/">
            Home
          </Link>
          <Link to="about">About</Link>
        </nav>
        <button onClick={handleClick}>팀즈로 이동</button>
      </div>
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="about/*" element={<AboutMenu />} />
        <Route path="*" element={null} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route path="teams">
          <Route index element={<LeagueStanding />} />
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
