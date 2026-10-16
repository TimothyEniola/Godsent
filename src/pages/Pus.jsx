
import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const ProjectUploadSuccess = () => {
  return (
    <div className="min-h-screen bg-white text-[#1E293B]">
      {/* Existing Navbar */}
      <Navbar />

      {/* Main Success Section */}
      <main className="relative flex min-h-[calc(100vh-80px)] flex-col items-center overflow-hidden px-4 pb-10 pt-7 sm:pt-10">
        {/* Left Side Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-7 hidden h-60 w-[9%] bg-[#1260FF] sm:block lg:top-8 lg:h-64 lg:w-[9.2%]"
        >
          <div className="absolute right-0 top-0 h-full w-4 bg-black" />
        </div>

        {/* Right Side Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-7 hidden h-60 w-[9%] bg-[#1260FF] sm:block lg:top-8 lg:h-64 lg:w-[9.2%]"
        >
          <div className="absolute left-0 top-0 h-full w-4 bg-black" />
        </div>

        {/* Content */}
        <section className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Hello, <span className="text-[#1260FF]">Godsent!</span>
          </h1>

          {/* Green Success Icon */}
          <div
            className="mt-6 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#45D17D] sm:mt-6 sm:h-[96px] sm:w-[96px]"
            role="img"
            aria-label="Success"
          >
            <svg
              viewBox="0 0 64 64"
              className="h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 33L25 46L53 17"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>

          {/* Success Message */}
          <div className="mt-8 flex min-h-[68px] w-full max-w-[293px] items-center justify-center rounded-xl bg-[#1260FF] px-4 py-5 text-white shadow-sm sm:mt-[34px] sm:min-h-[67px]">
            <p className="text-sm font-semibold sm:text-base">
              Project Uploaded Successfully!
            </p>
          </div>
        </section>

        {/* Bottom Project Details Link */}
        <div className="relative z-10 mt-auto flex w-full max-w-5xl flex-col items-start justify-between gap-5 pt-16 sm:flex-row sm:items-center sm:pt-16">
          <Link
            to="/project-details"
            className="inline-flex items-center gap-2 text-left text-xs leading-6 transition-colors hover:text-[#1260FF] sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 fill-[#1745A5]"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
            </svg>

            <span>
              Click here{" "}
              <span className="text-[#1260FF]">
                to edit your project details
              </span>
            </span>
          </Link>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Scroll to top"
            className="self-end p-1 text-[#404040] transition-colors hover:text-[#1260FF] sm:self-auto"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="M12 4 3 13h5v7h8v-7h5z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProjectUploadSuccess;
