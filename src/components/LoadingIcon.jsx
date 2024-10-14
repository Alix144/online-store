import Image from "next/image";

export default function LoadingIcon({ product }) {
  return (
    <div className="mx-auto h-5 w-5 flex justify-center items-center">
      <Image
        src="/images/loading.png"
        alt="Loading Icon"
        width={100}
        height={100}
        className="animate-spin"
      />
    </div>
  );
}
