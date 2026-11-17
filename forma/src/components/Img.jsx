import { useState } from "react";
export default function Img({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="image-fallback" role="img" aria-label={alt}>
      <span>FORMA</span>
      <small>{alt}</small>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
