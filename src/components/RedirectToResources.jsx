import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToResources = () => {
  useEffect(() => {
    window.location.href = "https://drive.google.com/drive/folders/1UkE_lPxqfkLs46BsgDPHQJsVT3wL_Ul7?usp=sharing";
  }, []);

  return <p>Redirecting to resources...</p>;
};

export default RedirectToResources;
