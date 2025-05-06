import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/movieContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';

import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW

const App = () => {
  return (
   <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <SiteHeader/>
      <MoviesContextProvider>
        <Routes>
          <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reviews/:id" element={<MovieReviewPage/>} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
   </QueryClientProvider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

