import { animate_details } from "../utils/animateContent";

function JobCardSkeleton() {
  return (
    <>
      <div className="space-y-3">
        {animate_details.map(() => (
          <div className="w-full p-5 bg-zinc-50 animate-pulse  rounded-xl">
            <div className="space-y-2 font-medium">
              <h1 className="w-full h-3 bg-zinc-200 rounded-md"></h1>
              <div className="space-y-2 text-sm items-center">
                <div className="w-60 h-3 bg-zinc-200 rounded-md"></div>
                <div className="w-48 h-3 bg-zinc-200  rounded-md"></div>
              </div>
              <div className="pt-2 flex flex-col gap-2 ">
                <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
                <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
                <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
                <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
                <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              </div>
              <p className="w-28 h-3 bg-zinc-200 rounded-md"></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JobCardSkeleton