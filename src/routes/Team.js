import { useParams } from "react-router-dom";

const Team = () => {
  const { teamId } = useParams();
  return (
    <div>
      <h3>팀 {teamId} 을 찾으시나요?</h3>
    </div>
  );
};

export default Team;
