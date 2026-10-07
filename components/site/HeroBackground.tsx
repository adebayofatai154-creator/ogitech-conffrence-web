"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Hero background photo with a graceful fallback: if the file at `src` is
 * missing (e.g. before someone has added a real photo), this unmounts
 * itself instead of leaving a broken-image icon on screen — the section
 * still looks correct because .s-hero has a solid navy background under it.
 */
export function HeroBackground({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="s-hero__media" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
