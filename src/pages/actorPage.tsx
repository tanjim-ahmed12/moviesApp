import React from "react";
import { useParams } from "react-router-dom";
import { useActor } from "../hooks/useActor";
import Spinner from "../components/spinner";

const ActorPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useActor(id!);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  return (
    <div>
      <h2>{data?.name}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt={data?.name} />
      <p>{data?.biography}</p>
      <p>Born: {data?.birthday}</p>
      {/* <p>Department: {data?.known_for_department}</p> */}
    </div>
  );
};

export default ActorPage;
