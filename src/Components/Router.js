import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "Components/Header";

export default () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/tv" component={TV}></Route>
          <Route path="/search" component={Search}></Route>
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};
// composition은 두개 이상의 라우터를 렌더링하는 방식
// <Route path="/tv" component={TV}></Route>
// <Route path="/tv/popular" render={()=><h1>Popular</h1>} />
// Redirect란  일치하는 Route가 하나도 없다면
// 어느 페이지든 받아서  / 으로 보내주라
// <Redirect from="*" to="/"/>
// Switch는 한번에 오직 하나의 Route 만 Render하게 해준다.
