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
import { announceUpdate } from "./data/config";
import { GLO_VER, JAP_VER } from "./data/config";

const announceHTML = `<div class="announce">
  JAP ${JAP_VER}, GLO ${GLO_VER} Update
  <br/>
  <br/>
  근시일 내에 사이트가 변경될 예정입니다.<br/>
  Site will be changed Soon.
  <br/>
  <br/>
  자세한 내용은 아래 게시물을 확인부탁드립니다.<br/>
  Please check following post.
  <br/>
  <br/>
  <a href="https://aecheck.tistory.com/44" target="_blank" rel="noreferrer">한국어</a>
  <br/>
  <a href="https://www.reddit.com/r/AnotherEdenGlobal/comments/17d469m/aecheckcom_will_be_changed_soon/?utm_source=share&utm_medium=web2x&context=3" target="_blank" rel="noreferrer">English(Reddit)</a>

</div>`;

function App() {
  const { lang } = useContext(AnotherContext);
  const message = require(`./language/${lang}.json`);

  useEffect(() => {
    window.localStorage.removeItem("a_v_230428");
    const checkDay = window.localStorage.getItem("AE_INFO");
    const announceKey = `${announceUpdate}_${lang}`;
    if (checkDay !== announceKey) {
      // if (true) {
      Swal.fire({
        title: "Data Update",
        html: announceHTML,
        icon: "info",
      }).then(() => {
        window.localStorage.setItem("AE_INFO", announceKey);
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
