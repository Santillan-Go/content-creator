"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  icon?: LucideIcon;
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
  variant?: "default" | "ghost" | "minimal";
  onClick?: () => void;
}

export default function BackButton({
  href,
  icon: Icon = ArrowLeft,
  className,
  iconSize = 24,
  children,
  variant = "default",
  onClick,
}: BackButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 transition-all duration-200";

  const variants = {
    default:
      "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg",
    ghost:
      "px-2 py-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-md",
    minimal: "text-gray-600 hover:text-gray-900",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={cn(baseClasses, variants[variant], className)}
      onClick={handleClick}
    >
      <Icon size={iconSize} className="flex-shrink-0" />
      {children && <span className="text-sm font-medium">{children}</span>}
    </Link>
  );
}

// Pre-configured variants for common use cases
export const BackArrow = ({
  href,
  className,
  onClick,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
}) => (
  <BackButton
    href={href}
    icon={ArrowLeft}
    variant="minimal"
    className={className}
    onClick={onClick}
  />
);

export const BackChevron = ({
  href,
  className,
  onClick,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
}) => (
  <BackButton
    href={href}
    icon={ChevronLeft}
    variant="ghost"
    className={className}
    onClick={onClick}
  />
);

export const CloseButton = ({
  href,
  className,
  onClick,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
}) => (
  <BackButton
    href={href}
    icon={X}
    variant="minimal"
    className={className}
    onClick={onClick}
  />
);
