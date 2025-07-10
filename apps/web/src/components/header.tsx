"use client";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	const links = [
		{ to: "/", label: "Home", icon: <AiOutlineHome className="h-5 w-5" /> },
		{
			to: "/dashboard",
			label: "Dashboard",
			icon: <MdDashboard className="h-5 w-5" />,
		},
	];

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label, icon }) => {
						return (
							<Link key={to} href={to} className="flex items-center gap-2">
								{icon}
								<span>{label}</span>
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
