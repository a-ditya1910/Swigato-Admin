import React from "react";
import "./OrderSkeletonLoader.css"; // Shimmer effect

const OrderSkeletonLoader = () => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div className="relative mb-4 bg-gray-200 rounded-md overflow-hidden" key={index}>
          {/* Skeleton Image */}
          <div className="mb-4">
            <div className="skeleton-image"></div>
          </div>

          {/* Food item information */}
          <div>
            <div className="skeleton-text skeleton-name-rating mb-2"></div>
            <div className="skeleton-text skeleton-desc mb-2"></div>
            <div className="skeleton-text skeleton-price"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeletonLoader;
