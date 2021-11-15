import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { Routes, Route } from "react-router-dom";

import HomePage from "../../AppPage/HomePage";
import AdminPage from "../../AppPage/AdminPage";
import AppHeader from "../Header";
import FavoriteTab from "../HomePage/FavoriteTab";
import HistoryTab from "../HomePage/HistoryTab";
import ShopTab from "../HomePage/ShopTab";
import CartTab from "../HomePage/CartTab";

import HomeTab from "../AdminPage/HomeTab";
import AddTab from "../AdminPage/AddTab";
import InfoTab from "../AdminPage/InfoTab";
import EditTab from "../AdminPage/EditTab";

const AppWrap = styled("div")(
  ({ theme }) => `
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
`
);

const AppMain = styled("main")`
  flex-grow: 1;
`;

// const AppFooter = styled("footer")`
//   background-color: antiquewhite;
// `;

export default function AuthenticatedApp() {
  return (
    <AppWrap>
      <AppHeader />
      <AppMain>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<ShopTab />} />
              <Route path=":shopId" element={<ShopTab />} />
              <Route path="/favorite" element={<FavoriteTab />} />
              <Route path="/cart" element={<CartTab />} />
              <Route path="/history" element={<HistoryTab />} />
            </Route>
            <Route path="/createShop" element={<InfoTab />} />
            <Route path="/myShop" element={<AdminPage />}>
              <Route index element={<HomeTab />} />
              <Route path="add" element={<AddTab />} />
              <Route path="info" element={<InfoTab />} />
              <Route path=":productId" element={<EditTab />} />
            </Route>
          </Routes>
        </Container>
      </AppMain>
      {/* <AppFooter>Footer</AppFooter> */}
    </AppWrap>
  );
}
