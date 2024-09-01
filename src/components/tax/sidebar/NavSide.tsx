import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  Collapse,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetAllFieldSteps,
  RsetProductList,
  RsetListPay,
  RsetPatternTypeId,
  handleGetBill,
} from "../../../common/slices/taxSlice";

interface Props {
  reloadRoute: () => void;
  reRenderRoute?: boolean;
  setReRenderRoute?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavSide: React.FC<Props> = ({
  reloadRoute,
  setReRenderRoute,
  reRenderRoute,
}) => {
  let submenuList: number[] = [];
  const { account, tax } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleSubMenuToggle = (itemId: number) => {
    console.log(itemId);
    if (itemId === 3 || itemId === 8) {
      dispatch(RsetPatternTypeId({ billPattern: {}, billType: {} }));
      dispatch(RsetAllFieldSteps({ rowPersonBuyer: {} }));
      dispatch(RsetProductList([]));
      dispatch(RsetListPay([]));
    }
    setOpenSubMenu(openSubMenu === itemId ? null : itemId);
  };
  const findSubMenu = (parentId: number, userMenu: any) => {
    return userMenu.filter((item: any) => item.parentID === parentId);
  };

  const handleToggleSubMenue = (): void => {
    reloadRoute();
  };

  const renderMenu = (parentId = 0) => {
    return account?.userMenu
      ?.filter((item) => item.parentID === parentId)
      .map((item: any) => {
        const subMenuItems = findSubMenu(item.id, account?.userMenu);
        return (
          <div key={item.id} className="mx-2">
            <Link
              className="text-decoration-none"
              to={item.menuUrl !== "" && item.menuUrl}
            >
              <Col xl="12" className="sideAnimate my-2 cursorPointer py-2 ">
                <div
                  onClick={() => handleSubMenuToggle(item.id)}
                  className=" text-decoration-none"
                >
                  <i className={` text-white  font20 ms-2 bi ${item?.icon}`} />
                  <span className=" text-white ms-3">{item?.name}</span>
                  {/* {(item?.hasSubMenu === true && openSubMenu) ? <i className="bi bi-caret-down font20 align-items-center text-white" /> : <i className=" font20 align-items-center bi bi-caret-up-fill text-white" />} */}
                </div>
              </Col>
            </Link>
            {subMenuItems.length > 0 && (
              <Collapse
                in={openSubMenu === item.id}
                className="col-sm-12 col-md-12 "
              >
                <Row className="">
                  {subMenuItems.map((item: any) => {
                    return (
                      <Col
                        key={item.id}
                        sm="12"
                        md="12"
                        xl="12"
                        className="d-flex cursorPointer  my-2 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white"
                      >
                        <i className="mt-2 font20 my-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white" />
                        <Link
                          onClick={handleToggleSubMenue}
                          className="text-decoration-none"
                          to={item.menuUrl}
                        >
                          <span className=" text-white  ms-3">{item.name}</span>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Collapse>
            )}
          </div>
        );
      });
  };

  return (
    <>
      {/* <div className='my-4 mx-2 my-sm-1' >
                <Col xl="12" className='sideAnimate cursorPointer my-4 py-2 ' >
                    <Link className='text-decoration-none' to="/">
                        <i className="text-white  font20 ms-2 bi bi-house-door" />
                        <span className=' text-white  ms-3' >
                            خانه
                        </span>
                    </Link>
                </Col>
                <Col sm="12" xl="12" md="12" onClick={() => setOpen(!open)} className='d-flex sideAnimate cursorPointer' >
                    <i className="bi bi-calendar2-minus text-white font20 ms-2" />
                    <span className='text-white ms-3' >
                        مدیریت صورتحساب ها
                    </span>
                    {!open ? <i className="bi bi-caret-down font20 align-items-center text-white" /> : <i className=" font20 align-items-center bi bi-caret-up-fill text-white" />}
                </Col>
                <Collapse in={open} className='col-sm-12 col-md-12'>
                    <Row className="" >
                        <Col sm="12" md="12" xl="12" id="example-collapse-text" className=' d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
                            <i className='mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
                            <Link className='text-decoration-none' to="/users/baseSubmitTaxReq">
                                <span className=' text-white  ms-3'>
                                    درخواست صورتحساب
                                </span>
                            </Link>
                        </Col>
                        <Col sm="12" md="12" xl="12" id="example-collapse-text" className='d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
                            <i className='mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
                            <Link className='text-decoration-none' to="/users/listBills">
                                <span className=' text-white  ms-3'>
                                    لیست صورتحساب
                                </span>
                            </Link>
                        </Col>
                        <Col sm="12" md="12" xl="12" id="example-collapse-text" className=' d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
                            <i className='mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
                            <span className=' text-white  ms-3'>
                                صورتحساب های تایید شده
                            </span>
                        </Col>
                        <Col sm="12" md="12" xl="12" id="example-collapse-text" className=' d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
                            <i className='mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
                            <Link className='text-decoration-none' to="/users/batchEntry">
                                <span className=' text-white  ms-3'>
                                    وارد کردن دسته‌ای صورتحساب
                                </span>
                            </Link>
                        </Col>
                    </Row>
                </Collapse>
                <Col xl="12" className=' d-flex sideAnimate cursorPointer my-4 py-2 ' >
                    <i className="text-white  align-items-center d-flex  font20 ms-2 bi bi-power" />
                    <span className=' text-white  ms-3' >
                        خروج
                    </span>
                </Col>
            </div > */}
      {renderMenu()}
    </>
  );
};

export default NavSide;

// const renderSubMenu = (submenuItems, parentId) => {
//     const submenus = submenuItems.filter((submenu) => submenu.parentID === parentId);

//     if (submenus.length === 0) {
//         return null;
//     }
//     return (
//       <>
//             {submenus.map((submenu) => (
//                 <div key={submenu.id}>
//                     <ListItemButton
//                         onClick={(event) => handleOpenSubMenu(event, submenu.id)}
//                         sx={{ display: "flex", gap: 2, color: textColor }}
//                     >
//                         <Box sx={{ margin: 0, padding: 0, marginLeft: subMargin, alignSelf: 'center' }}>
//                             {hasSubmenus(submenu.id) ? (
//                                 openSubMenuIds.includes(submenu.id) ? (
//                                     <img src={expendLess} alt="expendLess" />
//                                 ) : (
//                                     <img src={expendMore} alt="expendMore" />
//                                 )
//                             ) : null}
//                         </Box>
//                         {submenu.menuUrl ? (
//                             <NavLink
//                                 to={`/${extractSecondSection(submenu.menuUrl)}`}
//                                 style={{
//                                     textDecoration: "none",
//                                     color: textColor,
//                                 }}
//                             >
//                                 <ListItemText
//                                     primary={submenu.name}
//                                     primaryTypographyProps={{ style: { fontSize: "13px" } }}
//                                     sx={{ color: textColor }}
//                                 />
//                             </NavLink>
//                         ) : (
//                             <ListItemText
//                                 primary={submenu.name}
//                                 primaryTypographyProps={{ style: { fontSize: "13px" } }}
//                                 sx={{ margin: 0, padding: 0, color: textColor }}
//                             />
//                         )}

//                     </ListItemButton>
//                     {/* Recursively render submenus /}
//             {renderSubMenu(submenuItems, submenu.id)}
//           </div>
//         ))}
//       </>
//     );
//   };
//   // render menu items in both sitution when open and close---------------------------------------------------------------------
//   const renderMenuItems = (items, parentId = 0) => {

//     return (
//       <>
//         {/ when menu is open */}
//                     {items.filter((item) => item.parentID === parentId)
//                         .map((item) => (
//                             <div key={item.id}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     {hasSubmenus(item.id) && (
//                                         <Box sx={{ margin: 0, padding: 0, marginLeft: "10px", alignSelf: 'center' }}>
//                                             {openSubMenuIds.includes(item.id) ? (
//                                                 <img src={expendLess} alt="expendLess" />
//                                             ) : (
//                                                 <img src={expendMore} alt="expendMore" />
//                                             )}
//                                         </Box>
//                                     )}
//                                     <ListItemButton
//                                         onClick={(event) => handleOpenSubMenu(event, item.id)}
//                                         sx={{
//                                             display: "flex",
//                                             gap: "15px",
//                                             color: textColor,
//                                             backgroundColor: "inherit",
//                                             padding: hasSubmenus(item.id) ? 0 : undefined,
//                                         }}
//                                     >

//                                         <IconButton
//                                             sx={{ marginLeft: 0, marginRight: 0, color: textColor }}
//                                             onClick={(event) => {
//                                                 if (!open) {
//                                                     handleClick(event);
//                                                 }
//                                             }}
//                                             id="demo-customized-button"
//                                             aria-controls={open2 ? "demo-customized-menu" : undefined}
//                                             aria-haspopup="true"
//                                             aria-expanded={open2 ? "true" : undefined}
//                                             variant="contained"
//                                             disableElevation
//                                         >
//                                             {getIcon(item.name)}
//                                         </IconButton>

//                                         {item.menuUrl ? (
//                                             <NavLink
//                                                 to={item.menuUrl}
//                                                 style={{
//                                                     textDecor

//                                                     ation: "none",
//                                                     color: textColor,
//                                                 }}
//                                             >
//                                                 <ListItemText
//                                                     primary={item.name}
//                                                     sx={{ fontSize: "10px", color: textColor }}
//                                                     primaryTypographyProps={{
//                                                         style: { fontSize: "15px" },
//                                                     }}
//                                                 />
//                                             </NavLink>
//                                         ) : (
//                                             <ListItemText
//                                                 primary={item.name}
//                                                 sx={{ fontSize: "10px" }}
//                                                 primaryTypographyProps={{
//                                                     style: { fontSize: "15px" },
//                                                 }}
//                                                 onClick={onclicText}
//                                             />
//                                         )}
//                                     </ListItemButton>
//                                 </Box>
//                                 {openSubMenuIds.includes(item.id) &&
//                                     renderSubMenu(menuItems, item.id)}
//                             </div>
//                         ))}

//                 </>
//             );
//   };
