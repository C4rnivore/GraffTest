import Skeleton from "react-loading-skeleton";

function SkeletonWrapper({
  count,
  height,
  show,
  children
}: {
  count: number;
  height: number;
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {show ? <Skeleton count={count} height={height} /> : children}
    </>
  );
}

export default SkeletonWrapper;