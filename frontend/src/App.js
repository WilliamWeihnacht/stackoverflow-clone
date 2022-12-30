import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import QuestionIndex from "./components/QuestionIndex";
import NewQuestionForm from "./components/NewQuestionForm";
import QuestionShow from "./components/QuestionShow";

function App() {
  return (
    <>
      <Navigation/>
      <Switch>
        <Route exact path="/">
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
        <Route path="/questions/:questionId">
          <QuestionShow/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
