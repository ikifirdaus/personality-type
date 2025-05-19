const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="h-48 bg-gray-200 animate-pulse w-full" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 mb-3 w-3/4 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 mb-2 w-full rounded animate-pulse" />
        <div className="h-4 bg-gray-200 mb-2 w-5/6 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 w-1/3 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
