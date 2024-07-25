function ReviewPage() {
  return (
    <>
      <div className="w-full min-h-screen   max-xl:min-h-[550px] flex flex-col justify-center max-sm:py-7 max-lg:py-10">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl max-lg:text-2xl text-zinc-800 max-lg:text-center">
            Trusted by{" "}
            <span className="italic text-blue-700">
              leading brands and startups.
            </span>{" "}
            <br />{" "}
          </h1>
          <p className="text-base text-zinc-800/80 font-medium max-lg:text-center">
            Here's what they say about us.
          </p>
        </div>

        <div className="flex gap-4 py-8 max-lg:flex-col">
          <div className="p-4 w-full shadow shadow-zinc-500/40 rounded-md">
            <h1 className="font-semibold text-blue-700 text-lg">
              "The support is awesome"
            </h1>
            <p className="text-sm mt-2 font-medium text-zinc-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eum nostrum distinctio, beatae temporibus rem. Doloribus
              repellendus, maiores sed voluptate tempore repellat, quam, ab odio
              autem voluptas harum ut ipsam!
            </p>
            <div className="flex gap-3 items-center py-3">
              <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                <img src="/man2.png" alt="" />
              </div>
              <div>
                <div className="font-semibold text-sm">Mark obi</div>
                <div className="text-sm font-medium text-zinc-500">
                  Developer ar webflow
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 w-full shadow shadow-zinc-500/40 rounded-md">
            <h1 className="font-semibold text-blue-700 text-lg">
              "The support is awesome"
            </h1>
            <p className="text-sm mt-2 font-medium text-zinc-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eum nostrum distinctio, beatae temporibus rem. Doloribus
              repellendus, maiores sed voluptate tempore repellat, quam, ab odio
              autem voluptas harum ut ipsam!
            </p>
            <div className="flex gap-3 items-center py-3">
              <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                <img src="/man2.png" alt="" />
              </div>
              <div>
                <div className="font-semibold text-sm">Mark obi</div>
                <div className="text-sm font-medium text-zinc-500">
                  Developer ar webflow
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 w-full shadow shadow-zinc-500/40 rounded-md">
            <h1 className="font-semibold text-blue-700 text-lg">
              "The support is awesome"
            </h1>
            <p className="text-sm mt-2 font-medium text-zinc-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eum nostrum distinctio, beatae temporibus rem. Doloribus
              repellendus, maiores sed voluptate tempore repellat, quam, ab odio
              autem voluptas harum ut ipsam!
            </p>
            <div className="flex gap-3 items-center py-3">
              <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                <img src="/man2.png" alt="" />
              </div>
              <div>
                <div className="font-semibold text-sm">Mark obi</div>
                <div className="text-sm font-medium text-zinc-500">
                  Developer ar webflow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
