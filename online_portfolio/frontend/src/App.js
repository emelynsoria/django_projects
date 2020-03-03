import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Blog from "./components/Blogs";
import BlogDetails from "./components/Dialog/BlogDetails";
import Contacts from "./components/common-components/Contacts";
import UserPortfolio from "./components/UserPortfolio";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact component={Login} path="/" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/home" />
            <Route component={Profile} path="/account" />
            <Route component={About} path="/about" />
            <Route component={Experience} path="/work_experience" />
            <Route component={Education} path="/education" />
            <Route component={Skills} path="/skills" />
            <Route component={Projects} path="/projects" />
            <Route component={ProjectDetail} path="/project/:id/detail" />
            <Route component={Blog} path="/blog" />
            <Route component={Contacts} path="/contacts" />
            <Route component={BlogDetails} path="/blog_detail/:id" />
            <Route component={UserPortfolio} path="/user/:id/portfolio" />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}
