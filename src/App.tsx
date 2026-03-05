import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Report from "./pages/Report";
import Stories from "./pages/Stories";
import Surveys from "./pages/Surveys";
import Policy from "./pages/Policy";
import MyTickets from "./pages/MyTickets";
import Data from "./pages/Data";
import Training from "./pages/Training";
import TrainingModule from "./pages/TrainingModule";
import AboutMyCity from "./pages/AboutMyCity";
import MyProposals from "./pages/MyProposals";
import NotFound from "./pages/NotFound";
import ResolverHome from "./pages/resolver/ResolverHome";
import ResolverTasks from "./pages/resolver/ResolverTasks";
import ResolverSearchIssues from "./pages/resolver/ResolverSearchIssues";
import ResolverTraining from "./pages/resolver/ResolverTraining";
import ResolverAboutCity from "./pages/resolver/ResolverAboutCity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-proposals" element={<MyProposals />} />
          <Route path="/data" element={<Data />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:moduleId" element={<TrainingModule />} />
          <Route path="/about-my-city" element={<AboutMyCity />} />
          {/* Resolver Portal Routes */}
          <Route path="/resolver" element={<ResolverHome />} />
          <Route path="/resolver/tasks" element={<ResolverTasks />} />
          <Route path="/resolver/search" element={<ResolverSearchIssues />} />
          <Route path="/resolver/training" element={<ResolverTraining />} />
          <Route path="/resolver/about" element={<ResolverAboutCity />} />
          <Route path="/resolver/data" element={<Data />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
