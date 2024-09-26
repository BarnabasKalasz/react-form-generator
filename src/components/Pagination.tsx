import { useCallback, useMemo } from "react";
import "./Pagination.css";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberOfPages: number;
  maxDisplayedPageMarkers?: number;
};
export const Pagination = ({
  currentPage,
  numberOfPages,
  maxDisplayedPageMarkers = 5,
  setCurrentPage,
}: Props) => {
  const goToPage = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const createPageMarker = useCallback(
    (pageNumber: number, key: string | number) => {
      return (
        <li className="pagination-item" key={key}>
          <button
            className={`pagination-link ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    },
    [goToPage, currentPage]
  );

  const createEllipsis = useCallback(
    (key: string) => (
      <li className="pagination-item ellipsis" key={key}>
        ...
      </li>
    ),
    []
  );

  const createPagemarkerMidsection = useCallback(
    (limit: number) => {
      let sideCount = Math.floor(limit / 2);
      let markers = [];

      markers.push(createEllipsis("first"));
      new Array(limit).fill(null).forEach((_, i) => {
        const pageNo = currentPage + (i - sideCount);
        markers.push(createPageMarker(pageNo, pageNo));
      });
      markers.push(createEllipsis("second"));
      return markers;
    },
    [createPageMarker, createEllipsis, currentPage]
  );

  const createPageMarkers = useMemo((): JSX.Element[] => {
    let pageMarkers = [];
    let limit = maxDisplayedPageMarkers - 2;

    if (currentPage > limit && currentPage <= numberOfPages - limit) {
      pageMarkers.push(createPageMarker(1, 1)); /// first page marker always visible
      pageMarkers.push(createPagemarkerMidsection(limit)); /// Mid section page markers
      pageMarkers.push(createPageMarker(numberOfPages, "last")); /// last page marker always visible
    } else {
      if (currentPage <= limit) {
        for (let index = 0; index <= limit; index++) {
          pageMarkers.push(createPageMarker(index + 1, index + 1));
        }
        pageMarkers.push(createEllipsis("first"));
        pageMarkers.push(createPageMarker(numberOfPages, "last")); /// last page marker always visible
      } else {
        pageMarkers.push(createPageMarker(1, 1)); /// first page marker always visible
        pageMarkers.push(createEllipsis("second"));
        for (
          let index = numberOfPages - limit;
          index <= numberOfPages;
          index++
        ) {
          pageMarkers.push(
            createPageMarker(index, index === numberOfPages ? "last" : index)
          );
        }
      }
    }
    return pageMarkers.flat();
  }, [
    numberOfPages,
    currentPage,
    maxDisplayedPageMarkers,
    createPageMarker,
    createPagemarkerMidsection,
    createEllipsis,
  ]);

  return (
    <div className="pagination-container">
      <div className="pagination-wrapper">
        <button
          className="pagination-button prev"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <ul className="pagination-list">{createPageMarkers}</ul>
        <button
          className="pagination-button next"
          onClick={goToNextPage}
          disabled={currentPage === numberOfPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
