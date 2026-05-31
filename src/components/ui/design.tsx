"use client";

/**
 * Calaya design primitives — Apple-grade, brand-aware.
 *
 * Building blocks every dashboard page can drop in:
 *   <Card> <SectionHeading> <Button> <StatTile> <PageHero>
 *
 * They map onto the .ct-* CSS utilities defined in src/index.css so the
 * styling stays consistent without each page re-implementing typography,
 * shadows, or radii.
 */

import { CSSProperties, HTMLAttributes, ReactNode } from "react";

/* ---------------------------------------------------------- */
/*  Card                                                       */
/* ---------------------------------------------------------- */

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** When true, the card lifts subtly on hover. Use for clickable cards. */
  interactive?: boolean;
  /** Make the card flat (no shadow). Use for nested cards inside another card. */
  flat?: boolean;
  /** Internal padding scale */
  padding?: "none" | "sm" | "md" | "lg";
};

export function Card({
  className = "",
  interactive = false,
  flat = false,
  padding = "md",
  children,
  ...rest
}: CardProps) {
  const pad =
    padding === "none"
      ? ""
      : padding === "sm"
        ? "p-4"
        : padding === "lg"
          ? "p-6 md:p-8"
          : "p-5 md:p-6";

  const base = flat ? "ct-card-flat" : "ct-card";
  const hover = interactive ? "ct-card-hover cursor-pointer" : "";

  return (
    <div className={`${base} ${hover} ${pad} ${className}`} {...rest}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------- */
/*  Section heading                                            */
/* ---------------------------------------------------------- */

export function SectionHeading({
  title,
  subtitle,
  action,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="ct-section-title">{title}</h2>
        {subtitle ? <p className="ct-section-subtitle">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------- */
/*  Button                                                     */
/* ---------------------------------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  style,
  ...rest
}: ButtonProps) {
  const sizing =
    size === "sm"
      ? "px-3.5 py-2 text-[13px]"
      : size === "lg"
        ? "px-6 py-3.5 text-[15px]"
        : "px-[18px] py-2.5 text-[14px]";

  const visual = (() => {
    switch (variant) {
      case "secondary":
        return "ct-btn-secondary";
      case "ghost":
        return "ct-btn-ghost";
      case "danger":
        return "ct-btn"; // styled via inline style below
      case "accent":
        return "ct-btn"; // styled via inline style below
      case "primary":
      default:
        return "ct-btn-primary";
    }
  })();

  const inlineStyle: CSSProperties =
    variant === "danger"
      ? { backgroundColor: "var(--accent-red)", color: "#fff", ...style }
      : variant === "accent"
        ? { backgroundColor: "var(--secondary-blue)", color: "#0c2a3a", ...style }
        : style || {};

  return (
    <button
      className={`ct-btn ${visual} ${sizing} ${className}`}
      style={inlineStyle}
      {...rest}
    >
      {leadingIcon ? <span className="inline-flex">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="inline-flex">{trailingIcon}</span> : null}
    </button>
  );
}

/* ---------------------------------------------------------- */
/*  Pill / chip                                                */
/* ---------------------------------------------------------- */

type PillTone =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "purple"
  | "cyan"
  | "pink";

const pillTones: Record<PillTone, CSSProperties> = {
  default: { backgroundColor: "var(--tile-gray-bg)", color: "var(--tile-gray-fg)" },
  blue: { backgroundColor: "var(--tile-blue-bg)", color: "var(--tile-blue-fg)" },
  green: { backgroundColor: "var(--tile-green-bg)", color: "var(--tile-green-fg)" },
  orange: { backgroundColor: "var(--tile-orange-bg)", color: "var(--tile-orange-fg)" },
  red: { backgroundColor: "var(--accent-red-100)", color: "var(--accent-red)" },
  purple: { backgroundColor: "var(--tile-purple-bg)", color: "var(--tile-purple-fg)" },
  cyan: { backgroundColor: "var(--tile-cyan-bg)", color: "var(--tile-cyan-fg)" },
  pink: { backgroundColor: "var(--tile-pink-bg)", color: "var(--tile-pink-fg)" },
};

export function Pill({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span className={`ct-pill ${className}`} style={pillTones[tone]}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------- */
/*  Stat tile — pastel-icon stat card (the HiveQ pattern)      */
/* ---------------------------------------------------------- */

export function StatTile({
  label,
  value,
  icon,
  tone = "blue",
  trend,
  footer,
  onClick,
  className = "",
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  tone?: PillTone;
  trend?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const tones = pillTones[tone];
  const interactive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`ct-card ${interactive ? "ct-card-hover cursor-pointer" : ""} p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        {icon ? (
          <span
            className="ct-stat-icon"
            style={{ backgroundColor: tones.backgroundColor, color: tones.color }}
          >
            {icon}
          </span>
        ) : null}
        {trend ? <div className="text-xs">{trend}</div> : null}
      </div>
      <div className="mt-3">
        <div
          className="text-[28px] font-bold tracking-tight leading-none"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.022em" }}
        >
          {value}
        </div>
        <div
          className="text-[12px] mt-1.5 font-medium"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </div>
      </div>
      {footer ? (
        <div className="mt-4 pt-4 border-t border-[color:var(--separator)] text-[12px] text-[color:var(--text-secondary)]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- */
/*  Page hero — the "Welcome back" pattern                     */
/* ---------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  meta,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Right-side metadata column (e.g. a date pill) */
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`ct-card p-6 md:p-8 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <div className="mb-2 flex flex-wrap items-center gap-2">{eyebrow}</div>
          ) : null}
          <h1
            className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="mt-2 text-[15px] md:text-[16px]"
              style={{ color: "var(--text-secondary)", maxWidth: "62ch" }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {(meta || actions) && (
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-stretch sm:items-end lg:items-end">
            {meta}
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/*  Reveal — wraps children with a scroll-reveal animation     */
/* ---------------------------------------------------------- */

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("ct-revealed");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => entry.target.classList.add("ct-revealed"), delayMs);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={`ct-reveal ${className}`}>
      {children}
    </div>
  );
}
