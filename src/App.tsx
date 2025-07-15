import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import ContactPage from "./pages/ContactPage";
import AdminPanel from "./pages/AdminPanel";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ExpressDeliveryPage from "./pages/ExpressDeliveryPage";
import InternationalShippingPage from "./pages/InternationalShippingPage";
import BusinessSolutionsPage from "./pages/BusinessSolutionsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ShippingCalculatorPage from "./pages/ShippingCalculatorPage";
import CareersPage from "./pages/CareersPage";
import PressPage from "./pages/PressPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin_login69" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/express-delivery" element={<ExpressDeliveryPage />} />
            <Route path="/international-shipping" element={<InternationalShippingPage />} />
            <Route path="/business-solutions" element={<BusinessSolutionsPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/shipping-calculator" element={<ShippingCalculatorPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
