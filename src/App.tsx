import React, { useContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import Swal from "sweetalert2";
import { AnotherContext } from "./contexts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/organisms/Sidebar";
import MainPage from "./components/pages/MainPage";
import ResultPage from "./components/pages/ResultPage";
import BookPage from "./components/pages/BookPage";
import { BackTop } from "antd";
import PersonalPage from "./components/pages/PersonalPage";
import ManifestPage from "./components/pages/ManifestPage";
import BuddyPage from "./components/pages/BuddyPage";

const announceHTML = `<div class="announce">
  <br/>
  <br/>
  <h1>
    <a href="https://aecheck.com" target="_blank" rel="noreferrer">
      Please use the new website.
    </a>
  </h1>
</div>`;

function App() {
  const { lang } = useContext(AnotherContext);
  const message = require(`./language/${lang}.json`);

  useEffect(() => {
    if (true) {
      Swal.fire({
        title: "UPDATE STOPPED",
        html: announceHTML,
        icon: "error",
      });
    }
  }, [lang]);

  return (
    <IntlProvider messages={message} locale={lang} defaultLocale="ko">
      <Router basename={process.env.PUBLIC_URL}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/person" element={<PersonalPage />} />
          <Route path="/manifest" element={<ManifestPage />} />
          <Route path="/buddy" element={<BuddyPage />} />
        </Routes>
      </Router>
      <BackTop />
    </IntlProvider>
  );
}

export default App;
