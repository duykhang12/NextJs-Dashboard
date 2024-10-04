// import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px] ml-4">My Dashboard</p>
    </div>
  );
}
