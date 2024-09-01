import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  Collapse,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import NavSide from "./NavSide";
// import UserProfile from './UserProfile';
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../../hooks/hook";
import { handleGetUserMenuList } from "../../../common/slices/accountSlice";

interface Props {
  reloadRoute: () => void;
  showSide: boolean;
  setShowSide: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ reloadRoute, showSide, setShowSide }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const dispatch = useAppDispatch();
  const [reRenderRoute, setReRenderRoute] = useState<boolean>(false);

  useEffect(() => {
    dispatch(handleGetUserMenuList({}));
  }, []);

  return (
    <>
      <Container fluid className="py-4 positionRelative ">
        {isSmallScreen && (
          <>
            <Col
              xl="5"
              className="showIcon sitShowSideIcon bg-info rounded-start-4 mt-4"
            >
              <i
                onClick={() => setShowSide(!showSide)}
                className="px-2 py-4 bg-success cursorPointer bi  bi-chevron-double-right text-white font20  rounded-start-4  "
              />
            </Col>
          </>
        )}
        {/* <NavSide reloadRoute={reloadRoute} /> */}
      </Container>
    </>
  );
};

export default Sidebar;
