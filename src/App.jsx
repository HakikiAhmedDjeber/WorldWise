import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { FakeAuthContext } from "./contexts/FakeAuthContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// dist/index.html                   0.46 kB │ gzip:   0.30 kB
// dist/assets/index-Bo1eaKqF.css   30.46 kB │ gzip:   5.06 kB
// dist/assets/index-B4VRmb2U.js   507.05 kB │ gzip: 148.13 kB

const HomePage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// dist/index.html                           0.46 kB │ gzip:   0.30 kB
// dist/assets/Logo-BYigXoGP.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-B5O0XBJ4.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-ftt4lYil.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DU-CjQIG.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-CcPXYRy9.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-B-unMcS-.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-BrA07zeC.css           26.81 kB │ gzip:   4.41 kB
// dist/assets/Product.module-Be8LLB42.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-CFQU4vxw.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-Dn3aPpNc.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-CU-bOxdC.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-B1T6B_hD.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-BANYg8rl.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-CnwfiQps.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-DTr4fjln.js             1.02 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-D3TMjTWE.js       156.93 kB │ gzip:  46.22 kB
// dist/assets/index-DDhrgVoV.js           348.48 kB │ gzip: 101.68 kB

function App() {
  return (
    <FakeAuthContext>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />

              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthContext>
  );
}

export default App;
