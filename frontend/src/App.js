import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import QuestionIndex from "./components/QuestionIndex";
import NewQuestionForm from "./components/NewQuestionForm";
import QuestionShow from "./components/QuestionShow";
import SplashPage from "./components/SplashPage";
import NotFound from "./components/NotFound";
import UserShow from "./components/UserShow";
import SideBar from "./components/SideBar";
import UserIndex from "./components/UserIndex";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navigation/>
      <div id="main-content">
      <Switch>
        <Route exact path="/questions">
          <SideBar/>
          <QuestionIndex/>
        </Route>
        <Route path="/login">
          <LoginFormPage/>
        </Route>
        <Route path="/signup">
          <SignUpFormPage/>
        </Route>
        <Route path="/questions/new">
          <NewQuestionForm/>
        </Route>
        <Route exact path="/questions/:questionId">
          <SideBar/>
          <QuestionShow/>
        </Route>
        <Route exact path="/users">
          <SideBar/>
          <UserIndex/>
        </Route>
        <Route exact path="/users/:userId">
          <SideBar/>
          <UserShow/>
        </Route>
        <Route path="/splash">
          <SplashPage/>
        </Route>
        <Route path="*">
          <SideBar/>
          <NotFound/>
        </Route>
      </Switch>
      </div>
      <Footer/>
    </>
  );
}

export default App;
