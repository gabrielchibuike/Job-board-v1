import { Link } from "react-router-dom";

const vacancies = [
  {
    ExperienceType: "No Experience",
    jobs: "30 Jobs",
  },
  {
    ExperienceType: "Internship & Graduate",
    jobs: "30 Jobs",
  },
  {
    ExperienceType: "Entry level",
    jobs: "30 Jobs",
  },
  {
    ExperienceType: "Mid level",
    jobs: "30 Jobs",
  },
  {
    ExperienceType: "Experience",
    jobs: "30 Jobs",
  },
];
function CardSection() {
  return (
    <>
      <section>
        <div className="mt-20 max-lg:mt-9">
          <h1 className="text-center text-2xl font-bold">
            Find the right job vacancies in Nigeria
          </h1>
          <div className="py-5">
            <div className="font-medium text-lg">
              Find jobs that suit your experience level
            </div>
            <div className=" flex gap-5 items-center justify-between py-5 max-lg:flex-col w-full">
              {vacancies.map((ele) => (
                <Link to={"/"} className="w-full">
                  <div className="w-full max-lg:w-full h-auto p-5 flex justify-center flex-col items-center  font-medium bg-blue-700 text-white flex-shrink-0 rounded-lg py-8">
                    <div>{ele.ExperienceType}</div>
                    <div>{ele.jobs}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardSection;
