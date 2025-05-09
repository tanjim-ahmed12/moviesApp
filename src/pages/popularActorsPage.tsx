import React from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";

const PopularActorsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery("popular-actors", getPopularActors);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  return (
    <div>
      <h2>Popular Actors</h2>
      {data?.results.map((actor) => (
        <div key={actor.id}>
          <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default PopularActorsPage;
