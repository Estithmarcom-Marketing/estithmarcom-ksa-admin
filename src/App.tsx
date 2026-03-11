import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/over-view";
import Services from "./pages/services/services";
import Blog from "./pages/blogs/blog";
import Requests from "./pages/requests";
import ContactMessages from "./pages/contact-messages";
import Profile from "./pages/profile";
import Settings from "./pages/mithaq-info";
import Comments from "./pages/comments";
import AddBlog from "./pages/blogs/add-blog";
import Login from "./pages/login/login";
import Admins from "./pages/admins";
import BlogActions from "./pages/blogs/blog-actions";
import AddService from "./pages/services/add-service";
import ServiceActions from "./pages/services/service-actions";
import LoginGuard from "./auth/LoginGuard";
import AuthGuard from "./auth/DashboardGuard";
import Team from "./pages/team/team";
import AddMember from "./pages/team/add-member";
import MemberActions from "./pages/team/member-actions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />

        <Route element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />

            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<AddService />} />
            <Route path="services/:action" element={<Navigate to="/dashboard/services" replace />} />
            <Route path="services/:action/:id" element={<ServiceActions />} />

            <Route path="blog" element={<Blog />} />
            <Route path="blog/new" element={<AddBlog />} />
            <Route path="blog/:action" element={<Navigate to="/dashboard/blog" replace />} />
            <Route path="blog/:action/:id" element={<BlogActions />} />

            <Route path="team" element={<Team />} />
            <Route path="team/new" element={<AddMember />} />
            <Route path="team/:action" element={<Navigate to="/dashboard/team" replace />} />
            <Route path="team/:action/:id" element={<MemberActions />} />

            <Route path="admins" element={<Admins />} />
            
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="requests" element={<Requests />} />
            <Route path="messages" element={<ContactMessages />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;