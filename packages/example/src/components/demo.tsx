"use client";
import React from "react";

function Demo({ data }: { data: Record<string, any> }) {
  console.log("data here", data?.payload);

  return <div>Test</div>;
}
export default Demo;
