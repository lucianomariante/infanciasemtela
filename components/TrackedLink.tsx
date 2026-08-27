"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  eventName: string;
  eventProperties?: Record<string, string | number | boolean>;
};

export function TrackedLink({
  children,
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

type TrackedAffiliateLinkProps = ComponentProps<"a"> & {
  children: ReactNode;
  productTitle: string;
  placement: "card" | "summary";
};

export function TrackedAffiliateLink({
  children,
  onClick,
  placement,
  productTitle,
  ...props
}: TrackedAffiliateLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        track("affiliate_click", {
          placement,
          product: productTitle,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
