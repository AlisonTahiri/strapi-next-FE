const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function MainCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-clip max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-200`}
    >
      <div className="w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-400" />
      <div className="p-6 space-y-8 lg:col-span-5">
        <div className="bg-gray-400 h-10 w-full"></div>
        <div className="space-y-2">
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
        </div>
      </div>
    </div>
  );
}

function CardSceleton() {
  return (
    <div
      className={`${shimmer} relative overflow-clip max-w-sm w-full mx-auto group hover:no-underline focus:no-underline bg-gray-200`}
    >
      <div className="w-full rounded h-44 bg-gray-400" />
      <div className="p-6 space-y-2">
        <div className="bg-gray-400 h-10 w-full"></div>
        <div className="bg-gray-400 h-4 w-1/3"></div>

        <div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
          <div className="bg-gray-400 h-6 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <MainCardSkeleton />
      <div className="flex gap-4">
        <CardSceleton />
        <CardSceleton />
        <CardSceleton />
      </div>
    </>
  );
}
