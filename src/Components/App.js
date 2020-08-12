import React from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";

//Components/Header 파일에  index.js를 찾는다.

function App() {
  return (
    // Fragments는 네가 원하는 만큼 컴포넌트를 리턴할 수 있게 해준다.
    <>
      <Router />
      <GlobalStyles />
    </>
  );
}

export default App;
