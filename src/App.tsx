import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import GeneralRoutes from "./routes/GeneralRoutes";
import "./services/axios";
import Layout from "./layouts/Layout";
import PrivateLayout from "./layouts/PrivateLayout";
import ChangeProfile from "./components/changeProfile/ChangeProfile";
import BatchEntryPage from "./pages/batchEntry/BatchEntryPage";
import Loading from "./common/Loading";
import { useAppSelector } from "./hooks/hook";
import LogInForm from "./pages/logIn";
import SignUp from "./pages/signUp";

function App() {
  const { main } = useAppSelector((state) => state);

  return (
    <>
      <Loading isLoading={main?.showLoading?.value ? true : false} />
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/users/*"
              element={
                <PrivateLayout>
                  <PrivateRoutes />
                </PrivateLayout>
              }
            />
            <Route path="/*" element={<GeneralRoutes />} />
            <Route path="/logIn" element={<LogInForm />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;