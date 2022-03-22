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

export default About;
