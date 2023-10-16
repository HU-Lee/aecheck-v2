import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import Swal from 'sweetalert2';
import { AnotherContext } from './contexts';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './components/organisms/Sidebar';
import MainPage from './components/pages/MainPage';
import ResultPage from './components/pages/ResultPage';
import BookPage from './components/pages/BookPage';
import { BackTop } from 'antd';
import PersonalPage from './components/pages/PersonalPage';
import ManifestPage from './components/pages/ManifestPage';
import { GLO_VER, JAP_VER } from './data/config';
import BuddyPage from './components/pages/BuddyPage';
import { announceUpdate } from './data/constant';

const announceHTML = `<div class="announce">
  글로벌판 23.10.16 패치노트 반영<br />
  Update GLO 23.10.16 PatchNote Data
  <br />
  <br />
  조만간 사이트 업데이트를 준비중입니다.<br />
  불편이 없도록 준비되면 따로 공지드리겠습니다.
  <br />
  I'm preparing updates for aecheck.com.<br />
  I'll notify for it when it's ready so that there's no inconvenience.
</div>`

function App() {

  const { lang } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    window.localStorage.removeItem("a_v_230428")
    const checkDay = window.localStorage.getItem("AE_INFO")
    console.log(checkDay)
    if (checkDay !== announceUpdate) {
      Swal.fire({
        title: 'Update',
        html: announceHTML,
        icon: 'info',
      }).then(() => {
        window.localStorage.setItem("AE_INFO", announceUpdate)
      })
    }
  }, [])

  return (
    <IntlProvider messages={message} locale={lang} defaultLocale='ko'>
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
