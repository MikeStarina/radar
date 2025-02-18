import AuthPage from "./pages/authPage/authPage";
import MainPage from "./pages/main/mainPage";
import styles from './App.module.css'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'JetBrains Mono',
          fontSize: 12
        }
      }}
    >
      <BrowserRouter>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<AuthPage role='signin' />} />
            <Route path="/signup" element={<AuthPage role='signup' />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
