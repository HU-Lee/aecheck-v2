import React, { useContext, useEffect} from 'react';
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
import { JAP_VER } from './data/config';

const announceHTML = `<div class="announce">
  Up to GLOBAL 2.11.700, JAP ${JAP_VER}
  <br/>
  <br/>
  자세한 사항은 링크를 확인해 주세요. 
  <br/>
  Please Check following link.
  <br/>
  <a href="https://aecheck.tistory.com/12" target="_blank" rel="noreferrer">Patch Note</a>
</div>`

function App() {

  const announceViewed = Boolean(window.localStorage.getItem("a_v_220527"))

  const { lang } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    window.localStorage.removeItem("a_v_220519")
    if(!announceViewed) {
      Swal.fire({
        title: 'Update - 22.05.27',
        html: announceHTML,
        icon: 'success',
      }).then(() => {
        window.localStorage.setItem("a_v_220527", "true")
      })
    }
  }, [announceViewed])

  return (
    <IntlProvider messages={message} locale={lang} defaultLocale='ko'>
      <Router basename="/anothercharcheck">
          <Sidebar/>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/result" element={<ResultPage/>} />
              <Route path="/books" element={<BookPage/>} />
              <Route path="/person" element={<PersonalPage/>} />
              <Route path="/manifest" element={<ManifestPage/>} />
          </Routes>
      </Router>
      <BackTop/>
    </IntlProvider>
  );
}

export default App;
