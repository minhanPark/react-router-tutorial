# 리액트 라우터 튜토리얼

## 시작하기

App 컴포넌트를 BrowserRouter로 감싼다.

```js
// index.js
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
```

> url에 따라 컴포넌트를 나누는 것은 **Route**의 역할이고, Route들은 **Routes**를 통해서 감싸주면 된다.

```js
// App.js

import { Routes, Route } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";

function App() {
  return (
    <div>
      <h1>리액트 라우터 튜토리얼</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
```

> "/" 에는 Home 컴포넌트, "/about"에는 About 컴포넌트를 보여주게 된다.

### nested route

```js
<Route path="teams" element={<Teams />}>
  <Route index element={<LeagueStanding />} />
  <Route path=":teamId" element={<Team />} />
  <Route path="new" element={<NewTeamForm />} />
</Route>
```

위와 같이 nested route를 통해서 세분화해서 보여줄 수 있다.  
"/teams"에 접속 시 Teams 컴포넌트, LeagueStanding 컴포넌트(인덱스 라우터)를 보여줄 것이다.  
"/teams/new"에 접속 시 Teams 컴포넌트, NewTeamForm 컴포넌트를 보여줄 것이다.  
"/teams/1123"에 접속 시 Teams 컴포넌트, Team 컴포넌트를 보여줄 것이다.

> 중요한 점은 Teams 컴포넌트에 자식 Route의 컴포넌트들을 보여줄 Outlet 컴포넌트가 들어가 있어야 한다.

```js
// Teams.js
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
```

## Link나 useNavigation을 통해서 URL을 변경

```js
import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/teams");
  };
  return (
    <div>
      <nav>
        <Link style={{ marginRight: 5 }} to="/">
          Home
        </Link>
        <Link to="about">About</Link>
      </nav>
      <button onClick={handleClick}>팀즈로 이동</button>
    </div>
  );
}
```

Link 태그를 통해서 Home이나 About 페이지로 이동할 수 있고, "팀즈로 이동" 버튼을 통해서 팀즈 페이지로 이동가능하다.

## 동적라우팅

```js
<Route path="teams" element={<Teams />}>
  <Route path=":teamId" element={<Team />} />
</Route>
```

" : "을 통해서 동적 라우팅을 했다. 해당 값을 받아오려면 useParams를 사용하면 된다.

```js
import { useParams } from "react-router-dom";

const Team = () => {
  const { teamId } = useParams();
  return (
    <div>
      <h3>팀 {teamId} 을 찾으시나요?</h3>
    </div>
  );
};
```

:변수명이 그대로 담긴다는 것을 기억하자.

## 상대적인 경로의 Link

```js
import { Routes, Route, Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link> <Link to="team">Team</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Team() {
  return <h1>Team</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}
```

Link 태그에 "/"으로 시작하지 않는 것을 주목하자.  
이렇게 되면 상대적인 경로 주소를 가지게 될 것이다.(부모의 주소에 invoices나 team이 붙여짐). 즉 예시에서는 "/dashboard/invoices" 와 "/dashboard/team"이 될 것이다.

> 만약 부모의 url이 바뀐다면, 상대 경로를 가진 Link 들은 자동으로 바뀔 것이다.

## "Not Found" 라우트

```js
<Routes>
  (...다른 라우트들 있음)
  <Route path="*" element={<NotFound />} />
</Routes>
```

**만약 매칭 되는 라우트가 하나도 없다면 path에 \*을 주었을 때 보여줄 수 있다.** 해당 라우트는 not found 페이지를 만들 때 사용할 수 있다. 리액트 라우터는 \*에 가장 약한 우선 순위를 두고 아무것도 매칭되는 것이 없을 때 보여줄 것이다.

## 여러개의 Routes를 사용할 수도 있음

```js
<div>
  <Routes>
    <Route path="/" element={<HomeMenu />} />
    <Route path="about" element={<AboutMenu />} />
    <Route path="*" element={null} />
  </Routes>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="teams">
      <Route index element={<LeagueStanding />} />
      <Route path=":teamId" element={<Team />} />
      <Route path="new" element={<NewTeamForm />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</div>
```

예전엔 하나만 사용 가능했지만 이제는 필요하다면 여러개의 Routes를 사용할 수 있다.  
각각의 Routes 들은 **독립적으로 작동**할 것이다.

> 위에는 null 처리가 되어있고, 아래는 Not found로 표시한 이유는 만약 매칭되는 주소가 없다면 밑에 routes는 NotFound 컴포넌트를 렌더링할 것이지만 위에는 렌더링 할 것이 없다. 그러면 No routes matched location "/url"라는 경고문을 뱉을 것이다. 그렇다고 not found를 아래 위로 두번 렌더링할 수는 없으니 null 처리한 것임.

## Descendant Routes(후손 라우츠)

Routes는 어디에나 위치할 수 있다. 자식 컴포넌트에 넣어도 가능한데 이때 주의할 점은 부모 컴포넌트에서 "주소/\*" 표시를 해줘야한다. 왜냐하면 그 주소의 뒷부분을 받아들인다는 것을 알려줘야하기 때문이다.

```js
// App.js
<Route path="about/*" element={<About />} />;

//About.js
import { Routes, Route } from "react-router-dom";

const AboutList = () => (
  <div>
    <h4>어바웃 리스트</h4>
  </div>
);

const AboutInfo = () => (
  <div>
    <h4>어바웃 인포</h4>
  </div>
);

const About = () => {
  return (
    <div>
      <h2>어바웃 화면</h2>
      <p>더 많은 라우트</p>
      <div>
        <Routes>
          <Route path="/" element={<AboutInfo />} />
          <Route path="list" element={<AboutList />} />
        </Routes>
      </div>
    </div>
  );
};
```

만약 부모 컴포넌트에서 about라고만 표시했다면 /about/list로 보냈을 때 화면이 렌더링되지 않을것이다.(주소를 못찻음)  
path가 about/\* 이 되면 about으로 시작하는 모든 url에 매치되도록 자식 컴포넌트에서 확인하고 알맞은 컴포넌트를 렌더링하게 된다.
