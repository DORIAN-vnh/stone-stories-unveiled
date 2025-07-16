
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Business from "./pages/Business";
import AiChat from "./pages/AiChat";
import Admin from "./pages/Admin";
import Company from "./pages/Company";
import Monument from "./pages/Monument";
import Quarry from "./pages/Quarry";
import Marble from "./pages/Marble";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Discussions from "./pages/Discussions";
import Events from "./pages/Events";
import Contributors from "./pages/Contributors";
import PostDetail from "./pages/PostDetail";
import CreateDiscussion from "./pages/CreateDiscussion";
import CreateContent from "./pages/CreateContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/business" element={<Business />} />
            <Route path="/ai-chat" element={<AiChat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/company/:id" element={<Company />} />
            <Route path="/monument/:id" element={<Monument />} />
            <Route path="/quarry/:id" element={<Quarry />} />
            <Route path="/marble/:id" element={<Marble />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/discussions/new" element={<CreateDiscussion />} />
        <Route path="/create-content" element={<CreateContent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
