import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/over-view";
import Services from "./pages/services";
import Blog from "./pages/blog/blog";
import Team from "./pages/team";
import Requests from "./pages/requests";
import ContactMessages from "./pages/contact-messages";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Comments from "./pages/comments";
import EditBlog from "./pages/blog/edit-blog";
import AddBlog from "./pages/blog/add-blog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="services" element={<Services />} />

          <Route path="blog" element={<Blog />} />
          <Route path="blog/new" element={<AddBlog />} />
          <Route path="blog/:action/:id" element={<EditBlog />} />

          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="requests" element={<Requests />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;