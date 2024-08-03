import { useNavigate } from "react-router-dom";
import Button from "../button";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center text-3xl flex-col gap-5">
      <div className="text-5xl text-main-purple font-bold">Page Not Found</div>
      <Button
        title="Back to Home"
        onClick={() => navigate("/")}
        className="p-2 rounded-lg bg-main-purple border w-fit text-white border-solid border-blue hover:bg-main-purple-hover cursor-pointer"
      />
    </div>
  );
};

export default PageNotFound;
