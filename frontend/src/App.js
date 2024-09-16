import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


// publicly available pages:
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage.js";
import NewsListPage from "./pages/NewsListPage.js";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import Unfortunately from "./pages/unfortunately";
import UniformDetailsPage from "./pages/UniformDetailsPage.js";
import UniformListPage from "./pages/UniformListPage.js";
import ManageUniformBrandsPage from "./pages/user/ManageUniformBrandsPage.js";
import ManageUniformsPage from "./pages/user/ManageUniformsPage.js";
import ManageUniformUsersPage from "./pages/user/ManageUniformUsersPage";


/* import LoginRegisterPage from "./pages/LoginRegisterPage"; */
import LoginRegisterPage from "./pages/LoginRegisterPage";
import SplashPage from "./pages/SplashPage";
import FaqPage from "./pages/FaqPage";
import TermsConditions from "./pages/user/components/FooterComponents.js/TermsConditions.js";
import PrivacyPolicy from "./pages/user/components/FooterComponents.js/privacypolicy.js";
import GoodsReturnForm from "./pages/user/components/FooterComponents.js/GoodsReturnForm.js";
import ReturnProfitCalculator from "./pages/ReturnProfitCalculator.js";

import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";

//user components:
import RoutesWithHeaderFtNavb from "./components/user/RoutesWithHeaderFtNavb";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserUniformsPage from "./pages/user/UserUniformsPage";
import UserQuotesPage from "./pages/user/UserQuotesPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserPasswordPage from "./pages/user/UserPasswordPage";

import EmailVerify from "./components/user/EmailVerify";
import ResetPassword from "./components/user/ResetPassword";

// protected admin pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminDeliveryBook from "./pages/admin/AdminDeliveryBook";
import AdminCartDetailsPage from "./pages/admin/AdminCartDetailsPage";
import AdminWeathers from "./pages/admin/AdminWeathers";
import AdminPromotion from "./pages/admin/AdminPromotion";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminCreateDeliveryBookPage from "./pages/admin/AdminCreateDeliveryBookPage";
import AdminCreateWeatherPage from "./pages/admin/AdminCreateWeatherPage";
import AdminCreatePromotionPage from "./pages/admin/AdminCreatePromotionPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminEditDeliveryBook from "./pages/admin/AdminEditDeliveryBook";
import AdminEditPromotionPage from "./pages/admin/AdminEditPromotionPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminInvoicesPage from "./pages/admin/AdminInvoicesPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminCheckPage from "./pages/admin/AdminCheckPage";
import AdminTestPage from "./pages/admin/AdminTestPage";
import AdminPurchaseOrder from "./pages/admin/AdminPurchaseOrder";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminCreateChart from "./pages/admin/AdminCreateChart.js";
import AdminQuotesPage from "./pages/admin/AdminQuotesPage";
import ScrollToTop from "./utils/ScrollToTop";
import AdminUserInteractions from "./pages/admin/AdminUserInteractions.js";
import AdminCreateNews from "./pages/admin/AdminCreateNews.js";
import AdminNewsHub from "./pages/admin/AdminNewsHub.js";
import AdminUniforms from "./pages/admin/AdminUniforms.js";
import AdminEditUniform from "./pages/admin/AdminEditUniform.js";
import AdminCreateUniform from "./pages/admin/AdminCreateUniform.js";
import AdminUniformCartPage from "./pages/admin/AdminUniformCartPage.js";
import AdminUniformCartDetailsPage from "./pages/admin/AdminUniformCartDetailsPage.js";
import AdminEditUniformCartPage from "./pages/admin/AdminEditUniformCartPage.js";

//components
import PDFPreviewForVisitor from "./pages/user/components/HomePageForVisitors/PDFPreviewForVisitor.js";
import HomePageForVisitorNew from "./pages/HomePageForVisitorNew.js";
import CreditApplication from "./pages/user/components/FooterComponents.js/CreditApplication.js";
import SupplieCodeOfConduct from "./pages/user/components/FooterComponents.js/SupplieCodeOfConduct.js";
import AdminEditNews from "./pages/admin/AdminEditNews.js";
import ProtectedRoutesFilterComponent from "./components/ProtectedRoutesFilterComponent.js";
import MarketingAnalytics from "./pages/user/MarketingAnalytics.js";
import MarketingUserInteractions from "./pages/user/MarketingUserInteractions.js";
import MarketingPostsTrack from "./pages/user/MarketingPostsTrack.js";
import AdminPOCartDetailsPage from "./pages/admin/AdminPOCartDetailsPage.js";
import AdminCreateSupplierPage from "./pages/admin/AdminCreateSupplierPage.js";
import AdminSuppliersPage from "./pages/admin/AdminSuppliersPage.js";
import AdminEditSupplierPage from "./pages/admin/AdminEditSupplierPage.js";
import AdminPODetailsPage from "./pages/admin/AdminPODetailsPage.js";
import AdminPurchaseOrdersComponentCopy from "./pages/admin/components/AdminPurchaseOrdersComponent copy.js";


//mobile
import HomePageForVisitorMobile from "./pages/mobile/HomePageForVisitorMobile.js";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/PPP" element={<AdminPurchaseOrdersComponentCopy />} />
          <Route path="/login" element={<SplashPage />} />
          <Route path="/register" element={<SplashPage />} />
          <Route path="/loginRegister" element={<LoginRegisterPage />} />
          <Route path="/pdfpreview" element={<PDFPreviewForVisitor />} />
          <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/user/:id/resetPassword/:token" element={<ResetPassword />} />
          
          <Route element={<ProtectedRoutesComponent role="visitor" />}>
            <Route path="/unfortunately" element={<Unfortunately />} />
            <Route path="/FaqPage" element={<FaqPage />} />
            <Route path="/TermsConditions" element={<TermsConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/goodsreturnform" element={<GoodsReturnForm />} />
            <Route path="/applycreaditaccount" element={<CreditApplication />}/>
            <Route path="/scodeofc" element={<SupplieCodeOfConduct />} />
            <Route path="/" element={<HomePageForVisitorNew />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-details/:id" element={<ProductDetailsPage />}/>
          </Route>

          {/* Mobile version for a visitor */}
          <Route path="/m.home" element={<HomePageForVisitorMobile />} />

          {/* publicly available routes: */}
          <Route element={<ProtectedRoutesComponent role="user" />}>
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route path="/" element={<HomePageForVisitorNew />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-details/:id" element={<ProductDetailsPage />} />
            <Route path="/uniform-details/:id" element={<UniformDetailsPage />} />
            <Route path="/news-list" element={<NewsListPage />} />
            <Route path="/news-details/:id" element={<NewsDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/return-calculator" element={<ReturnProfitCalculator />} />
            <Route path="/uniform-list" element={<UniformListPage />} />
            <Route path="/manage-uniformBrands" element={<ManageUniformBrandsPage />} />
            <Route path="/manage-uniforms" element={<ManageUniformsPage />} />
            <Route path="/manage-uniform-users" element={<ManageUniformUsersPage />} />
            <Route path="*" element="Page not exists 404" />
          </Route>

          {/* user protected routes: */}
          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/password" element={<UserPasswordPage />} />
            <Route path="/user/my-orders" element={<UserOrdersPage />} />
            <Route path="/user/my-uniforms" element={<UserUniformsPage />} />
            <Route path="/user/my-quotes" element={<UserQuotesPage />} />
            <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
            <Route path="/user/order-details/:id" element={<UserOrderDetailsPage />} />
            <Route path="/user/analytics" element={<MarketingAnalytics />} />
            <Route path="/user/postsTrack" element={<MarketingPostsTrack />} />
            <Route path="/user/userInteractions" element={<MarketingUserInteractions />} />
          </Route>

          {/* admin protected routes: */}

          <Route
            element={
              <ProtectedRoutesComponent admin={true} userPrevent={true} />
            }
          >
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route
              path="/admin/edit-user/:id"
              element={<AdminEditUserPage />}
            />
            <Route
              path="/admin/cart-details"
              element={<AdminCartDetailsPage />}
            />
            <Route
              path="/admin/poCart-details"
              element={<AdminPOCartDetailsPage />}
            />
            <Route
              path="/admin/deliveryBooks"
              element={<AdminDeliveryBook />}
            />
            <Route path="/admin/weathers" element={<AdminWeathers />} />
            <Route path="/admin/promotions" element={<AdminPromotion />} />
            <Route
              path="/admin/edit-deliveryBook/:id"
              element={<AdminEditDeliveryBook />}
            />
            <Route
              path="/admin/create-new-deliveryBook"
              element={<AdminCreateDeliveryBookPage />}
            />
            <Route path="/admin/suppliers" element={<AdminSuppliersPage />} />
            <Route
              path="/admin/create-new-supplier"
              element={<AdminCreateSupplierPage />}
            />
            <Route
              path="/admin/edit-supplier/:id"
              element={<AdminEditSupplierPage />}
            />
            <Route
              path="/admin/create-new-weather"
              element={<AdminCreateWeatherPage />}
            />
            <Route
              path="/admin/create-new-promotion"
              element={<AdminCreatePromotionPage />}
            />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route
              path="/admin/create-new-product"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="/admin/edit-product/:id"
              element={<AdminEditProductPage />}
            />
            <Route
              path="/admin/edit-promotion/:id"
              element={<AdminEditPromotionPage />}
            />
            {/* <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/invoices" element={<AdminInvoicesPage />} /> */}
            <Route
              path="/admin/invoices"
              element={
                <ProtectedRoutesFilterComponent
                  permissionKey="accounts"
                  route={AdminInvoicesPage}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoutesFilterComponent
                  permissionKey="isSales"
                  route={AdminOrdersPage}
                />
              }
            />
            {/* <Route path="/admin/test" element={<AdminTestPage />} /> */}
            <Route
              path="/admin/test"
              element={
                <ProtectedRoutesFilterComponent
                  permissionKey="isDeveloper"
                  route={AdminTestPage}
                />
              }
            />
            <Route
              path="/admin/qbConnect"
              element={<AdminTestPage />}
            />
            <Route path="/admin/quotes" element={<AdminQuotesPage />} />
            <Route
              path="/admin/order-details/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/admin/checks" element={<AdminCheckPage />} />
            <Route
              path="/admin/purchaseOrders"
              element={<AdminPurchaseOrder />}
            />
            <Route
              path="/admin/po-details/:id"
              element={<AdminPODetailsPage />}
            />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route
              path="/admin/userInteractions"
              element={<AdminUserInteractions />}
            />
            <Route path="/admin/charts" element={<AdminCreateChart />} />
            <Route path="/admin/create-news" element={<AdminCreateNews />} />
            <Route path="/admin/newsHub" element={<AdminNewsHub />} />
            <Route path="/admin/edit-news/:id" element={<AdminEditNews />} />

            <Route path="/admin/uniforms" element={<AdminUniforms />} />
            <Route
              path="/admin/edit-uniform/:id"
              element={<AdminEditUniform />}
            />
            <Route
              path="/admin/create-new-uniform"
              element={<AdminCreateUniform />}
            />

            <Route
              path="/admin/UniformCart"
              element={<AdminUniformCartPage />}
            />
            <Route
              path="/admin/UniformCart-details/:id"
              element={<AdminUniformCartDetailsPage />}
            />
            <Route
              path="/admin/edit-UniformCart/:id"
              element={<AdminEditUniformCartPage />}
            />
          </Route>

          <Route path="*" element="Page not exists 404" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
