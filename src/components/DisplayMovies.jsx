import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import "../css/DisplayMovies.css";

const DisplayMovies = ({
  movieToggle,
  movieList,
  sectionId,
  isSearch = false,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const itemsList = document.querySelector(`.movies-list-${sectionId}`);
    if (itemsList) {
      const { scrollLeft, scrollWidth, clientWidth } = itemsList;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const itemsList = document.querySelector(`.movies-list-${sectionId}`);
    if (itemsList) {
      itemsList.addEventListener("scroll", checkScrollPosition);
      return () => itemsList.removeEventListener("scroll", checkScrollPosition);
    }
  }, [sectionId]);

  const scrollToNext = () => {
    const itemsList = document.querySelector(`.movies-list-${sectionId}`);
    if (itemsList) {
      itemsList.scrollBy({
        left: 800,
        behavior: "smooth",
      });
      // Wait for smooth scroll to finish
      setTimeout(checkScrollPosition, 350);
    }
  };

  const scrollToPrev = () => {
    const itemsList = document.querySelector(`.movies-list-${sectionId}`);
    if (itemsList) {
      itemsList.scrollBy({
        left: -800,
        behavior: "smooth",
      });
      // Wait for smooth scroll to finish
      setTimeout(checkScrollPosition, 350);
    }
  };

  return (
    <div className="popular-movies-container">
      {!isSearch && (
        <button
          className={`scroll-btn scroll-btn-left ${
            !canScrollLeft ? "disabled" : ""
          }`}
          onClick={scrollToPrev}
          disabled={!canScrollLeft}
        >
          <span className="material-icons-outlined">navigate_before</span>
        </button>
      )}
      <div className={`movies-list movies-list-${sectionId}`}>
        {movieList.map((item) =>
          movieToggle ? (
            <ItemCard item={item} itemType="movie" key={item.id} />
          ) : (
            <ItemCard item={item} itemType="tv" key={item.id} />
          )
        )}
      </div>
      {!isSearch && (
        <button
          className={`scroll-btn scroll-btn-right ${
            !canScrollRight ? "disabled" : ""
          }`}
          onClick={scrollToNext}
          disabled={!canScrollRight}
        >
          <span className="material-icons-outlined">navigate_next</span>
        </button>
      )}
    </div>
  );
}

export default DisplayMovies;
