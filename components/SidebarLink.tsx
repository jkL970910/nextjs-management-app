'use client';

import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation"; //this only works in client component
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }) => {
  const pathname = usePathname(); //since the active only changes based on the path, we don't need to set it as a state
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon]; // a component can't be sent across the network as this client coponent is used in a server component, this way we can only send a string to map the component since component is not serializable
  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;