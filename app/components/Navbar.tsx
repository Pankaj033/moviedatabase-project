"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?movie=${input}`);
    setInput("");
    };
  return (
    <div className="bg-black py-3 px-3 md:px-0">
      <div className="container mx-auto flex justify-between items-left">
        <Link href="/">
          <div className="text-[30px] flex justify-centre" style={{ color:"#fbbf24"}}>MOVIES</div>
        </Link>

      <form onSubmit={searchMovie}>
        <div className="space-x-0">
          <input className="bg-gray-900 px-1 py-2 outline-black flex-justify placeholder:text-textColor"type="text" value={input}
          placeholder="Search a Movie...."
          onChange={(e)=>setInput(e.target.value)}/> 
          <button type="submit"className="bg-gray-900 text-textColor flex-centre  py-2 px-5 hover:bg-textcolor hover:text-white">
          ⌕
          </button>
        </div>  
      </form>  
      </div>
    </div>
  );
};
export default Navbar;