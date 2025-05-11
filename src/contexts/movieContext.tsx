// import React, { useState, useCallback } from "react";
// import { BaseMovieProps } from "../types/interfaces";
import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

// interface MovieContextInterface {
//     favourites: number[];
//     addToFavourites: ((movie: BaseMovieProps) => void);
//     removeFromFavourites: ((movie: BaseMovieProps) => void);
//     addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
//     myReviews: { [id: number]: Review };
//     mustWatch: BaseMovieProps[]; // NEW
//     addToMustWatch: ((movie: BaseMovieProps) => void); // NEW
// }

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    mustWatch: BaseMovieProps[];
    addToMustWatch: (movie: BaseMovieProps) => void;
    myReviews: { [id: number]: Review }; 
  }
  
// const initialContextState: MovieContextInterface = {
//     favourites: [],
//     addToFavourites: () => {},
//     removeFromFavourites: () => {},
//     addReview: (movie, review) => { movie.id, review},  // NEW
//     mustWatch: [], //  NEW
//     addToMustWatch: () => {}, //  NEW
//     myReviews
// };
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
    myReviews: {}, 
  };
  

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const [myReviews, setMyReviews] = useState<{ [id: number]: Review }>({});
    
    // const [setMyReviews] = useState<{ [id: number]: Review }>({});

    const [favourites, setFavourites] = useState<number[]>([]);
    // const [mustWatch, setMustWatch] = useState<number[]>([]);  // NEW
    const [mustWatch, setMustWatch] = useState<BaseMovieProps[]>([]); // full movies


    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    // const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
    //     setMyReviews( {...myReviews, [movie.id]: review } )
    //   };
    const addReview = (movie: BaseMovieProps, review: Review) => {
        setMyReviews(prevReviews => ({
          ...prevReviews,
          [movie.id]: review
        }));
      };

      const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prev) => {
          if (!prev.some((m) => m.id === movie.id)) {
            const updated = [...prev, movie];
            console.log("Must Watch List:", updated); // For testing
            return updated;
          }
          return prev;
        });
      }, []);


    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch, // NEW
                addToMustWatch, // NEW
                myReviews
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
