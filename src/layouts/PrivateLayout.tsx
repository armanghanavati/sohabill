import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hook";
import { getUserProfileInfo } from "../services/masterServices";
import { handleLoading } from "../common/slices/mainSlice";
import { RsetUserRole } from "../common/slices/accountSlice";
import Header from "./header/NavBar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
interface Props {
  children: JSX.Element[] | JSX.Element;
}

const PrivateLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [accepRefresh, setAccepRefresh] = useState<boolean>(false);
  const location = useLocation();
  const isSmallScreenHead = useMediaQuery({ query: "(max-width: 768px)" });
  const [shouldShowHeader, setShouldShowHeader] = useState<boolean>(true);
  // const history = useHistory();
  // ! در صورت حذف users از روت ها فقط یک / بگذارید
  // Define the function to check if the header should be shown
  const checkShouldShowHeader = (
    isSmallScreenHead: boolean,
    currentRoute: string,
  ) => {
    const baseRout = "/users";
    const noHeaderRoutes = [
      `${baseRout}/addGoods`,
      `${baseRout}/billing`,
      `${baseRout}/addBuyer`,
    ];
    // Normalize routes to lower case for case insensitive comparison
    const normalizedCurrentRoute = currentRoute.toLowerCase();
    const normalizedNoHeaderRoutes = noHeaderRoutes.map((route) =>
      route.toLowerCase(),
    );
    // const previousRoot= location.state !== "/users/billsList"
    return (
      // previousRoot ||
      !isSmallScreenHead ||
      (isSmallScreenHead &&
        !normalizedNoHeaderRoutes.includes(normalizedCurrentRoute))
    );
  };
  // useeft for show
  useEffect(() => {
    // console.log( history.goBack(),"goBack")
    const currentRoute = location.pathname;
    setShouldShowHeader(checkShouldShowHeader(isSmallScreenHead, currentRoute));
  }, [isSmallScreenHead, location.pathname]);
  // -> handle refresh
  const handleGetUserProfileInfo = async () => {
    if (localStorage.getItem("tokenId") === null) {
      window.location.assign("/login");
    } else {
      try {
        dispatch(handleLoading({ loading: true }));
        const resRefresh = await getUserProfileInfo();
        dispatch(handleLoading({ loading: false }));
        if (resRefresh?.data?.code === 0) {
          dispatch(RsetUserRole(resRefresh?.data?.result));
          setAccepRefresh(true);
        }
      } catch (error) {
        dispatch(handleLoading({ loading: false }));
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUserProfileInfo();
  }, []);

  return (
    <section>
      {shouldShowHeader && <Header />}
      <main className="tw-container tw-mx-auto">
        {accepRefresh && children}
      </main>
    </section>
  );
};

export default PrivateLayout;
