import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedArticles from "./components/FeaturedArticles";
import FeaturedTutorials from "./components/FeaturedTutorials";
import Subscribe from "./components/Subscribe";
import Login from "./pages/login";
import Register from "./pages/register";
import Pricing from "./pages/Pricing";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <FeaturedTutorials />
      <Subscribe />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
