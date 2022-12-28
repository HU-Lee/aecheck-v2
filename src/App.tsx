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
import { GLO_VER, JAP_VER } from './data/config';
import BuddyPage from './components/pages/BuddyPage';

const announceHTML = `<div class="announce">
  글로벌판 네코코 AS 반영
  <br/>
  Update Necoco(AS) to GLOBAL server
  <br/>
</div>`

function App() {

  const announceViewed = Boolean(window.localStorage.getItem("a_v_221229"))

  const { lang } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    window.localStorage.removeItem("a_v_221220")
    if(!announceViewed) {
    // if(true) {
      Swal.fire({
        title: 'Update 22.12.29',
        html: announceHTML,
        icon: 'info',
      }).then(() => {
        window.localStorage.setItem("a_v_221229", "true")
      })
    }
  }, [])

  return (
    <IntlProvider messages={message} locale={lang} defaultLocale='ko'>
      <Router basename={process.env.PUBLIC_URL}>
          <Sidebar/>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/result" element={<ResultPage/>} />
              <Route path="/books" element={<BookPage/>} />
              <Route path="/person" element={<PersonalPage/>} />
              <Route path="/manifest" element={<ManifestPage/>} />
              <Route path="/buddy" element={<BuddyPage/>} />
          </Routes>
      </Router>
      <BackTop/>
    </IntlProvider>
  );
}

export default App;
