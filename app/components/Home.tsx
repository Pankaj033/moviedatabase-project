"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Loading from './Loading';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import Genres from './Genres';
import { BsPlayFill } from "react-icons/bs";

const Home = () => {
  interface IMovie {
    poster_path: string;
    title: string;
    genres: [
      {
        name: string;
        id: string;
      }
    ];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [movie, setMovie] = useState<IMovie>();

  const SuspensefulSearchParams = () => {
    const searchParams = useSearchParams();
    return searchParams;
  };


  const searchParams = SuspensefulSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsImgLoading(true);

    let searchMovie = searchParams.get("movie");
    if (searchMovie === null) {
      searchMovie = 'One Piece 3D2Y: Overcome Ace\'s Death! Luffy\'s Vow to his Friends';
    }

    axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        query: searchMovie,
      },
    }).then((res) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${res?.data?.results[0]?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
        )
        .then((res) => {
          setMovie(res.data);
          setIsLoading(false);
        });
    });
  }, [searchParams]);

  return (
    <div className="bg-secondary relative px-4 md:px-0">
      {isLoading && <Loading />}

      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
        <div className="flex-col lg:flex-row flex gap-8 lg:mx-8 py-20">
          <div className="mx-auto flex-none relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              width={500}
              height={300}
              className="w-[300px] object-cover"
              alt="movie poster"
              onLoadingComplete={() => setIsImgLoading(false)}
              priority
            />
            {isImgLoading && <Loading />}
          </div>

          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
              {movie?.title}
            </div>

            <div className="flex gap-4 flex-wrap">
              {movie?.genres?.map((genre, index) => (
                <Genres
                  key={genre?.id}
                  index={index}
                  length={movie?.genres?.length}
                  name={genre?.name}
                />
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>Language: {movie?.original_language?.toUpperCase()}🎙️</div>
              <div>Release: {movie?.release_date}📅</div>
              <div>Runtime: {movie?.runtime} MIN⌛.</div>
              <div>Rating: {movie?.vote_average} ⭐</div>
            </div>

            <div className="pt-3 space-y-2 pr-2">
              <div>StoryLine:</div>
              <div className="lg:line-clamp-3">{movie?.overview}</div>

              <div
                className="inline-block pt-4 cursor-pointer"
              >
                <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                  <BsPlayFill size={24} />
                  Watch Trailer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
