import React from "react";
import "./ListSkeletonLoader.css";

const ListSkeletonLoader = () => {
  return (
    <div className="flex flex-col">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="relative shimmer-skeleton flex items-center gap-4 p-4 rounded-md my-2 bg-gray-200 overflow-hidden"
        >
          {/* Skeleton Image (hidden on small screens) */}
          <div className="w-12 h-12 rounded-md bg-gray-300 hidden sm:block skeleton-element"></div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-5 bg-gray-300 rounded w-24 sm:w-24 w-16 skeleton-element"></div>
            <div className="h-4 bg-gray-300 rounded w-24 sm:w-24 w-12 skeleton-element"></div>
            <div className="h-5 bg-gray-300 rounded w-14 sm:w-14 w-10 skeleton-element"></div>
            <div className="h-5 bg-gray-300 rounded w-6 sm:w-6 w-4 skeleton-element"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListSkeletonLoader;
