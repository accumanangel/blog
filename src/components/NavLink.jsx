"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons

export default function NavLink({ href, label, iconName, size, color }) {
  const pathname = usePathname();
  const Icon = iconName ? LucideIcons[iconName] : null; // Dynamically resolve the icon

  return (
    <Link
      className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
      href={href}
    >
      <div className="flex items-center gap-x-1">
        {/* Render the icon if resolved */}
        {Icon && <Icon size={size} color={color} />}
        {label}
      </div>
    </Link>
  );
}
