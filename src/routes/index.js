import React from "react";
import {Route, IndexRoute} from "react-router";
import Home from "../components/main";
import HomePage from "../components/home/homePage";
import AboutPage from "../components/aboutPage/aboutPage";
import Description from "../components/appDescriptionPage/descriptionPage";
import OwnedDocs from "../components/userPage/ownedDocs";
import SharedDocs from "../components/userPage/sharedDocs";
import EditDoc from "../components/userPage/editDocument";
import EditUser from "../components/userPage/editUserDataPage";
import Search from "../components/userPage/search";
import NotFoundPage from "../components/NotFoundPage";

export default(
  <Route path='/' component={Home}>
    <IndexRoute component={HomePage}/>
    <Route path='about' component={AboutPage}/>
    <Route path='docs/edit/:type/:id' component={EditDoc}/>
    <Route path='profile/edit' component={EditUser}/>
    <Route path='shared-docs' component={SharedDocs}/>
    <Route path='search' component={Search}/>
    <Route path='the-app' component={Description}/>
    <Route path='/owned-docs' component={OwnedDocs}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
