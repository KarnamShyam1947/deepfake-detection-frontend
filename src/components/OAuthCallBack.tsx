import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  id?: number;
  message?: string;
  jwtToken?: string;
  refreshToken?: string | null;
  name?: string;
  role?: string;
  email?: string;
  phoneNumber?: string | null;
}

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("token");
    const next = localStorage.getItem("next") || "/";

    if (raw) {
      try {
        const decoded = decodeURIComponent(raw);
        const loginResponse: LoginResponse = JSON.parse(decoded);

        if (loginResponse.jwtToken) {
          localStorage.setItem("user", JSON.stringify(loginResponse));
          localStorage.setItem("token", loginResponse.jwtToken);
        }

        toast({
          title: "Success",
          description: loginResponse.message,
        });

        console.log("Login response:", loginResponse);
      } catch (err) {
        console.error("Failed to parse token JSON:", err);
      }
    }



    window.history.replaceState({}, "", window.location.pathname);

    navigate(next);
  }, [navigate]);

  return <div>Processing login…</div>;
};

export default OAuthCallback;
