import { GiTeacher } from "react-icons/gi";
import { MdEngineering } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { BsMegaphone } from "react-icons/bs";
import { MdOutlinePalette } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { domain } from "../api/client";
import { useDispatch } from "react-redux";
import { categoryPayload, isLoading } from "../ReduxStore/store";
function CategoryPage() {
  const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  const direct = useNavigate();
  const data = [
    {
      icon: <BiCodeAlt />,
      style: "bg-red-300/30",
      categoryName: "Development & IT",
      number_of_job: "102 Jobs",
      highlight: "Javascript, python, java, Node.js, React..",
    },
    {
      icon: <MdOutlinePalette />,
      style: "bg-purple-300/30",
      categoryName: "Design & Creative",
      number_of_job: "102 Jobs",
      highlight: "Figma, Adobe XD, Photoshop..",
    },
    {
      icon: <BsMegaphone />,
      style: "bg-green-300/30",
      categoryName: "Marketing",
      number_of_job: "102 Jobs",
      highlight: "Digital Markerting, Email specialist..",
    },
    {
      icon: <BsBank />,
      style: "bg-indigo-300/30",
      categoryName: "Accounting & Financing",
      number_of_job: "102 Jobs",
      highlight: "python, Excel, Accouting..",
    },
    {
      icon: <MdEngineering />,
      style: "bg-orange-300/30",
      categoryName: "Enginnering",
      number_of_job: "102 Jobs",
      highlight: "3D Design, Design principles, Automobile..",
    },
    {
      icon: <GiTeacher />,
      style: "bg-pink-300/30",
      categoryName: "Educator",
      number_of_job: "102 Jobs",
      highlight: "software instrutor, mathematics teacher..",
    },
  ];

  async function handleCategory(category: string) {
    const option = {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    };
    dispatch(isLoading({ isLoading: true }));
    const request = await fetch(
      `${domain}/api/allcategory/${category}`,
      option
    );

    if (request.ok) {
     
      
      setTimeout(async () => {
        const result = await request.json();

        dispatch(isLoading({ isLoading: false }));

        dispatch(categoryPayload({ categoryPayload: [...result] }));

      }, 2000);
      direct(`/category-result`);
    } else if (request.status == 400) {
      dispatch(isLoading({ isLoading: false }));
      const result = await request.text();
      console.log(result);
    } else if (request.status == 403) {
      dispatch(isLoading({ isLoading: false }));
      // const result = await request.text();
      direct("/login")
    }
  }

  // Refatch data when the browser reloads
  // async function ReFetchData() {
  //   const JobCategory = searchParams.get("jobCategory") as string;
  //   console.log(JobCategory);
    
  //   const searchValues = new URLSearchParams({ JobCategory });
  //   const option = {
  //     method: "POST",
  //     headers: {
  //       "x-auth-token": localStorage.getItem("AccessToken") as string,
  //     },
  //   };
  //   const request = await fetch(
  //     `${domain}/api/allcategory/${searchValues}`,
  //     option
  //   );

  //   if (request.ok) {
  //     const result = await request.json();
  //     dispatch(searchPayload({ searchPayload: [...result] }));
  //   } else if (request.status == 400) {
  //     const result = await request.text();
  //     console.log(result);
  //   }
  // }

  // useEffect(() => {
  //   ReFetchData();
  // }, []);
  return (
    <>
      <div className="w-full  min-h-screen max-xl:min-h-[400px] bg-blue-100/10 p-14 rounded-3xl max-lg:p-2 max-lg:py-10">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl text-zinc-80 max-lg:text-center">
            Explore By <span className="text-blue-700 italic">Category</span>
          </h1>
          <p className="text-base text-zinc-800/80 font-medium max-lg:text-center">
            Explore all the job by category and find your perfect and suitable{" "}
            <br /> jobthat you badly need.
          </p>
        </div>

        <div className=" w-full grid grid-cols-3 gap-5 py-10  max-lg:grid-cols-1">
          {data.map((e, i) => (
            <div
              key={i}
              className={`p-5 w-full h-[170px]  bg-white rounded-2xl   relative space-y-1 cursor-pointer`}
              onClick={() => handleCategory(e.categoryName)}
            >
              <div
                className={`w-14 h-14 ${e.style} text-zinc-600 rounded-full flex justify-center items-center text-2xl`}
              >
                {e.icon}
              </div>
              <div>
                <h1 className="font-semibold text-zinc-600">
                  {e.categoryName}
                </h1>
                <p className="text-zinc-600 text-xs font-medium">
                  {e.number_of_job}
                </p>
              </div>
              <p className="text-xs text-zinc-600 mt-1">{e.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
