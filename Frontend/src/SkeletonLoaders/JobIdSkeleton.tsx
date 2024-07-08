import { BsFillBookmarkFill } from "react-icons/bs";
import Button from "../Reuseables/Button";

function JobIdSkeleton() {
  return (
    <>
      <div className="space-y-3">
        <div className="w-full p-5 bg-zinc-50 animate-pulse  rounded-xl">
          <div className="space-y-2 font-medium">
            <h1 className="w-full h-3 bg-zinc-200 rounded-md"></h1>
            <div className=" text-sm flex gap-2">
              <div className="w-40 h-3 bg-zinc-200 rounded-md"></div>
              <div className="w-40 h-3 bg-zinc-200  rounded-md"></div>
            </div>
            <div className="text-sm flex gap-2">
              <div className="w-32 h-3 bg-zinc-200 rounded-md"></div>
              <div className="w-32 h-3 bg-zinc-200  rounded-md"></div>
            </div>
            <div className="w-36 flex items-center gap-5">
              <Button
                btn_text="Apply"
                additionalclass="w-[600px] bg-zinc-200 text-transparent"
              />
              <div className="p-[6px] w-auto h-auto bg-zinc-100 rounded-md cursor-pointer">
                <BsFillBookmarkFill className="text-xl bg-zinc-200 text-zinc-200" />
              </div>
            </div>
            <div className="pt-2 flex flex-col gap-2 ">
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
              <p className="w-full h-3 bg-zinc-200 rounded-md"></p>
            </div>
            <p className="w-28 h-3 bg-zinc-200 rounded-md"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobIdSkeleton