import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/over-view";
import Services from "./pages/services/services";
import Blog from "./pages/blogs/blog";
import Requests from "./pages/requests/requests";
import ContactMessages from "./pages/contact-messages/contact-messages";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Comments from "./pages/comments/comments";
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
import Subscribes from "./pages/subscribes";
import RequestActions from "./pages/requests/request-action";
import MessageActions from "./pages/contact-messages/contact-messages-action";
import CommentsActions from "./pages/comments/comments-action";
import FAQs from "./pages/faqs/faqs";
import AddFAQ from "./pages/faqs/add-faq";
import FAQActions from "./pages/faqs/faq-actions";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/add-client";
import ClientActions from "./pages/clients/client-actions";
import Countries from "./pages/countries/countries";
import AddCountry from "./pages/countries/add-country";
import CountryActions from "./pages/countries/country-actions";
import FreeZones from "./pages/free-zones/free-zones";
import AddFreeZone from "./pages/free-zones/add-free-zone";
import FreeZoneActions from "./pages/free-zones/free-zone-actions";
import Categories from "./pages/categories/categories";
import AddCategory from "./pages/categories/add-category";
import CategoryActions from "./pages/categories/category-actions";
import Highlights from "./pages/highlights/highlights";
import HighlightActions from "./pages/highlights/highlight-actions";
import Residencies from "./pages/residencies/residencies";
import AddResidency from "./pages/residencies/add-residency";
import ResidencyActions from "./pages/residencies/residency-actions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/overview" replace />}
        />

        <Route element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />

            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<AddService />} />
            <Route
              path="services/:action"
              element={<Navigate to="/dashboard/services" replace />}
            />
            <Route path="services/:action/:id" element={<ServiceActions />} />

            <Route path="clients" element={<Clients />} />
            <Route path="clients/new" element={<AddClient />} />
            <Route
              path="clients/:action"
              element={<Navigate to="/dashboard/clients" replace />}
            />
            <Route path="clients/:action/:id" element={<ClientActions />} />

            <Route path="residencies" element={<Residencies />} />
            <Route path="residencies/new" element={<AddResidency />} />
            <Route
              path="residencies/:action"
              element={<Navigate to="/dashboard/residencies" replace />}
            />
            <Route
              path="residencies/:action/:id"
              element={<ResidencyActions />}
            />

            <Route path="countries" element={<Countries />} />
            <Route path="countries/new" element={<AddCountry />} />
            <Route
              path="countries/:action"
              element={<Navigate to="/dashboard/countries" replace />}
            />
            <Route path="countries/:action/:id" element={<CountryActions />} />

            <Route path="free-zones" element={<FreeZones />} />
            <Route path="free-zones/new" element={<AddFreeZone />} />
            <Route
              path="free-zones/:action"
              element={<Navigate to="/dashboard/free-zones" replace />}
            />
            <Route
              path="free-zones/:action/:id"
              element={<FreeZoneActions />}
            />

            <Route path="faqs" element={<FAQs />} />
            <Route path="faqs/new" element={<AddFAQ />} />
            <Route
              path="faqs/:action"
              element={<Navigate to="/dashboard/faqs" replace />}
            />
            <Route path="faqs/:action/:id" element={<FAQActions />} />

            <Route path="blog" element={<Blog />} />
            <Route path="blog/new" element={<AddBlog />} />
            <Route path="blog/:action" element={<Navigate to="/dashboard/blog" replace />} />
            <Route path="blog/:action/:id" element={<BlogActions />} />

            <Route path="categories" element={<Categories />} />
            <Route path="categories/new" element={<AddCategory />} />
            <Route
              path="categories/:action"
              element={<Navigate to="/dashboard/categories" replace />}
            />
            <Route
              path="categories/:action/:id"
              element={<CategoryActions />}
            />

            <Route path="highlights" element={<Highlights />} />
            <Route
              path="highlights/:action"
              element={<Navigate to="/dashboard/highlights" replace />}
            />
            <Route
              path="highlights/:action/:id"
              element={<HighlightActions />}
            />

            <Route path="team" element={<Team />} />
            <Route path="team/new" element={<AddMember />} />
            <Route
              path="team/:action"
              element={<Navigate to="/dashboard/team" replace />}
            />
            <Route path="team/:action/:id" element={<MemberActions />} />

            <Route path="admins" element={<Admins />} />

            <Route path="settings" element={<Settings />} />

            <Route path="profile" element={<Profile />} />

            <Route path="requests" element={<Requests />} />
            <Route
              path="requests/:action"
              element={<Navigate to="/dashboard/requests" replace />}
            />
            <Route path="requests/:action/:id" element={<RequestActions />} />

            <Route path="messages" element={<ContactMessages />} />
            <Route
              path="messages/:action"
              element={<Navigate to="/dashboard/messages" replace />}
            />
            <Route path="messages/:action/:id" element={<MessageActions />} />

            <Route path="subscribes" element={<Subscribes />} />

            <Route path="comments" element={<Comments />} />
            <Route
              path="comments/:action"
              element={<Navigate to="/dashboard/comments" replace />}
            />
            <Route path="comments/:action/:id" element={<CommentsActions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
