"use client";

import dynamic from "next/dynamic";
import React from "react";

const Demo = dynamic(() => import("../../components/demo"), {
  ssr: false,
});

export default function Bootstrap({ data }: { data: Record<string, any> }) {
  return <Demo data={data} />;
}
