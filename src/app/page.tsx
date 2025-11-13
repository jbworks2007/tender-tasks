"use client";

import { useState } from "react";
import { LuBell, LuSlidersVertical } from "react-icons/lu";
import SearchBar from "@/components/dashboard/SearchBar";
import Columns from "@/components/dashboard/Columns";

export default function Home() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("board");
  return (
    <div className="flex min-h-screen items-center p-5 justify-center font-sans bg-black">
      <main className="min-h-screen w-full md:py-5 md:px-10 p-3 text-white bg-[#1F2023] sm:items-start rounded-2xl">
        {/* Header */}
        <div className="pb-3 border-b border-gray-500">
          <div className="grid sm:grid-cols-2 gap-2 items-center">
            <div className="text-2xl font-bold hover:text-amber-400 transition duration-500 ease-in-out">
              Tender Tasks
            </div>
            <div className="flex items-center justify-end gap-4">
              <SearchBar value={query} onChange={setQuery} placeholder="Search for Tenders" />
              <div className="p-2 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out">
                <LuBell size={25} />
              </div>
              <div className="rounded-full px-2 border-2 border-white text-white text-xl bg-red-400 hover:bg-amber-400 hover:text-black transition duration-500 ease-in-out">
                S
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-screen overflow-auto">
          {/* Viewer */}
          <div className="my-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-black rounded-full">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 px-7 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out ${
                    view == "list" ? "border border-amber-300" : ""
                  }`}
                  onClick={() => setView("list")}
                >
                  List View
                </div>
                <div
                  className={`p-3 px-7 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out ${
                    view == "board" ? "border border-amber-300" : ""
                  }`}
                  onClick={() => setView("board")}
                >
                  Board View
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 px-7 border border-amber-300 truncate hover:bg-gray-700 transition duration-500 ease-in-out">
                View Tender Details
              </div>
              <div className="p-3 px-7 border border-gray-400 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out">
                <div className="flex items-center">
                  <LuSlidersVertical size={22} />
                  <span className="ms-3">Columns</span>
                </div>
              </div>
            </div>
          </div>
          {/* Columns */}
          <Columns />
        </div>
      </main>
    </div>
  );
}
