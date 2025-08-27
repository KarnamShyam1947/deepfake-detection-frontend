import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prediction from "./pages/Prediction";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import VideoUploader from "./Test";
import OAuthCallback from "./components/OAuthCallBack";
import PredictionResult from "./pages/PredicitionResult";
import VerifyEmail from "./pages/VerifyEmail";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyExpired from "./pages/VerifyExpired";
import ForgotPassword from "./pages/ForgotPassword";
import NotActivated from "./pages/NotActivated";
import SetPassword from "./pages/SetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-activated" element={<NotActivated />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/verify/success" element={<VerifySuccess />} />
            <Route path="/verify/expired" element={<VerifyExpired />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-password/:token" element={<SetPassword />} />
            <Route 
              path="/prediction" 
              element={
                <ProtectedRoute>
                  <Prediction />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prediction-result" 
              element={
                <ProtectedRoute>
                  <PredictionResult />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            <Route path="/test" element={
              <ProtectedRoute>
                <VideoUploader />
              </ProtectedRoute>
              } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;