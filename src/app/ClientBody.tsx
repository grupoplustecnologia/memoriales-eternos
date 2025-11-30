"use client";

import { useEffect, useState } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.className = "antialiased";
  }, []);

  // Return children immediately for server hydration, then mount client-side
  return <div className="antialiased" data-mounted={mounted}>{children}</div>;
}
