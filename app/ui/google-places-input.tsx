"use client";

import { useEffect, useRef } from "react";

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onValueChange: (v: string) => void;
  onPlacePick?: (payload: { placeId: string; address: string }) => void;
};

declare global {
  interface Window {
    google?: any;
  }
}

function loadGooglePlaces(browserKey: string) {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.google?.maps?.places) return Promise.resolve(true);

  const existing = document.querySelector('script[data-google-maps="1"]') as HTMLScriptElement | null;
  if (existing) {
    return new Promise<boolean>((resolve) => {
      existing.addEventListener("load", () => resolve(!!window.google?.maps?.places));
      existing.addEventListener("error", () => resolve(false));
      setTimeout(() => resolve(!!window.google?.maps?.places), 500);
    });
  }

  return new Promise<boolean>((resolve) => {
    const s = document.createElement("script");
    s.dataset.googleMaps = "1";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      browserKey
    )}&libraries=places&language=ru&region=RU`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(!!window.google?.maps?.places);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

export default function GooglePlacesInput({
  id,
  name,
  placeholder,
  className,
  value,
  onValueChange,
  onPlacePick,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onPickRef = useRef(onPlacePick);
  onPickRef.current = onPlacePick;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
    if (!key) return;

    let autocomplete: any = null;
    let cancelled = false;

    (async () => {
      const ok = await loadGooglePlaces(key);
      if (!ok || cancelled) return;
      if (!inputRef.current) return;

      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["place_id", "formatted_address", "name"],
        types: ["geocode"],
        componentRestrictions: { country: ["ru"] },
      });

      autocomplete.addListener("place_changed", () => {
        const p = autocomplete.getPlace?.();
        const placeId = p?.place_id;
        const address = p?.formatted_address || p?.name;
        if (placeId && address) onPickRef.current?.({ placeId, address });
      });
    })();

    return () => {
      cancelled = true;
      autocomplete = null;
    };
  }, []);

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      autoComplete="off"
      inputMode="text"
    />
  );
}
