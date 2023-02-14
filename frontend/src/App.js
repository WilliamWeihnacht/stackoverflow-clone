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

function App() {
  return (
    <>
      <Navigation/>
      <Switch>
        <Route exact path="/questions">
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
          <QuestionShow/>
        </Route>
        <Route exact path="/users/:userId">
          <UserShow/>
        </Route>
        <Route path="/splash">
          <SplashPage/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
