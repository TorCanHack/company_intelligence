import { useState } from 'react';

export default function CompanyLogo({ name, logoUrl, className = 'size-13 rounded-xl' }) {
  const [failed, setFailed] = useState(false);
  const initial = name?.trim()?.[0]?.toUpperCase() ?? '?';

  if (logoUrl && !failed) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        onError={() => setFailed(true)}
        className={`flex-none border-[1.5px] border-sketch-border bg-white object-contain ${className}`}
      />
    );
  }

  return (
    <span
      className={`font-handwritten flex flex-none items-center justify-center border-[1.5px] border-sketch-border bg-sketch-chip text-sketch-heading ${className}`}
    >
      {initial}
    </span>
  );
}
