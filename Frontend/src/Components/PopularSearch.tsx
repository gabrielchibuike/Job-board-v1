
import { useRef } from "react";
import { IoMdSearch } from "react-icons/io";

const popularSearch = [
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
  {
    tittle: "Real Estate",
  },
];
function PopularSearch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnLeft = useRef<HTMLDivElement>(null);
  const btnRight = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    // console.log(containerRef.current!.scrollLeft);
    if (containerRef.current!.scrollLeft == 146) {
      btnLeft.current?.classList.remove("icofont-simple-left");
    }
    btnRight.current?.classList.add("icofont-simple-right");
    containerRef.current!.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    // console.log(containerRef.current!.scrollWidth);
    if (containerRef.current!.scrollWidth == 1352) {
      btnRight.current?.classList.remove("icofont-simple-right");
    }
    btnLeft.current?.classList.add("icofont-simple-left");
    containerRef.current!.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section>
        <div className="w-full h-auto mt-14 max-lg:mt-4">
          <h1 className="font-semibold text-lg">Popular Search</h1>
          <div className="relative">
            <div
              className=" overflow-x-scroll flex gap-2 p-3"
              ref={containerRef}
            >
              {popularSearch.map((ele) => (
                <div className="w-auto h-auto p-3 flex items-center gap-2 font-medium bg-blue-700 text-white flex-shrink-0 rounded-md">
                  <IoMdSearch className="font-semibold text-lg" />
                  <div>{ele.tittle}</div>
                </div>
              ))}
              <button
                className="absolute top-3 -left-9  py-2 px-2 w-auto h-auto rounded-full max-lg:hidden"
                onClick={scrollLeft}
              >
                <i
                  className="icofont-simple-left text-4xl text-zinc-500"
                  ref={btnLeft}
                ></i>
              </button>
              <button
                className="absolute top-3 -right-9 py-2 px-2 w-auto h-auto rounded-full max-lg:hidden"
                onClick={scrollRight}
              >
                <i
                  className="icofont-simple-right text-4xl text-zinc-500"
                  ref={btnRight}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PopularSearch;
