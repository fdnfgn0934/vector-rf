"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import GooglePlacesInput from "@/app/ui/google-places-input";

export type CarClass = "standard" | "comfort" | "business" | "minivan";
export type RouteType = "city" | "airport" | "intercity";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function formatRub(n: number) {
  return `${Math.round(n).toLocaleString("ru-RU")} ₽`;
}

function formatFrom(n: number) {
  return `от ${Math.round(n).toLocaleString("ru-RU")} ₽`;
}

function formatDurationRU(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);

  if (h <= 0) return `${m} мин`;
  if (m <= 0) return `${h} ч`;
  return `${h} ч ${m} мин`;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toDatetimeLocal(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function addMinutes(base: Date, minutes: number) {
  const d = new Date(base.getTime());
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function setTimeSameDay(base: Date, hh: number, mm: number) {
  const d = new Date(base.getTime());
  d.setHours(hh, mm, 0, 0);
  return d;
}

function normalizePhoneLive(input: string) {
  let v = input;
  if (v.startsWith("+8")) v = "+7" + v.slice(2);
  else if (v.startsWith("8")) v = "+7" + v.slice(1);
  else if (v.startsWith("7")) v = "+7" + v.slice(1);
  else if (v.startsWith("9")) v = "+7" + v;
  return v;
}

const PER_KM: Record<CarClass, number> = {
  standard: 30,
  comfort: 37,
  minivan: 55,
  business: 65,
};

const CITY_BASE_PRICE: Record<CarClass, number> = {
  standard: 1000,
  comfort: 1500,
  business: 3000,
  minivan: 3500,
};

function looksLikeAirport(s: string) {
  const v = normalize(s);
  if (!v) return false;
  if (v.includes("аэроп")) return true;

  return [
    "шереметьево",
    "домодедово",
    "внуково",
    "пулково",
    "храброво",
    "кольцово",
    "толмач",
    "курумоч",
    "пашков",
    "аэропорт",
  ].some((t) => v.includes(t));
}

function sameCity(a: string, b: string) {
  const x = normalize(a);
  const y = normalize(b);
  if (!x || !y) return false;

  const cities = [
    "москва",
    "санкт-петербург",
    "санкт петербург",
    "спб",
    "казань",
    "нижний новгород",
    "екатеринбург",
    "самара",
    "ростов-на-дону",
    "краснодар",
    "воронеж",
    "уфа",
    "челябинск",
    "пермь",
    "волгоград",
    "саратов",
    "тюмень",
    "ярославль",
    "тула",
    "рязань",
    "тверь",
    "иваново",
    "калуга",
    "кострома",
    "белгород",
    "курск",
    "брянск",
    "липецк",
    "орел",
    "чебоксары",
    "йошкар-ола",
    "смоленск",
  ];

  const pick = (s: string) => cities.find((c) => s.includes(c)) || null;
  const ca = pick(x);
  const cb = pick(y);

  if (ca && cb) return ca.replace("-", " ") === cb.replace("-", " ");
  return x === y;
}

function IconPlane() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 19l20-7-20-7 5 7-5 7Z" />
      <path d="M7 12h15" />
    </svg>
  );
}

function IconCar() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 16l1.4-5A2 2 0 0 1 8.3 9h7.4a2 2 0 0 1 1.9 2L19 16" />
      <path d="M3 16h18" />
      <circle cx="7" cy="17" r="1.7" />
      <circle cx="17" cy="17" r="1.7" />
    </svg>
  );
}

function IconCity() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18" />
      <path d="M5 21V9l6-3v15" />
      <path d="M11 21V4l8 3v14" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconSwap() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 7h11" />
      <path d="m14 4 4 3-4 3" />
      <path d="M17 17H6" />
      <path d="m10 14-4 3 4 3" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function TypeTab({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 items-center justify-center gap-1 rounded-2xl px-2 text-[12px] font-extrabold transition sm:text-[13px]",
        active
          ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)]"
          : "text-zinc-800"
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function CarClassCard({
  active,
  title,
  price,
  onClick,
}: {
  active: boolean;
  title: string;
  price: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[14px] border px-2.5 py-2 text-left transition",
        active
          ? "border-blue-200 bg-blue-50 shadow-[0_6px_14px_rgba(37,99,235,0.08)]"
          : "border-zinc-200 bg-white"
      )}
    >
      <div className={cn("text-[11px] font-bold", active ? "text-blue-700" : "text-zinc-900")}>
        {title}
      </div>
      <div
        className={cn(
          "mt-1 text-[11px] font-extrabold",
          active ? "text-blue-700" : "text-zinc-800"
        )}
      >
        {price}
      </div>
    </button>
  );
}

export default function LeadForm({
  carClass,
  onCarClassChange,
  routeType,
  onRouteTypeChange,
  initialFrom,
  initialTo,
}: {
  carClass: CarClass;
  onCarClassChange: (v: CarClass) => void;
  routeType: RouteType;
  onRouteTypeChange: (v: RouteType) => void;
  initialFrom?: string;
  initialTo?: string;
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromText, setFromText] = useState(initialFrom ?? "");
  const [toText, setToText] = useState(initialTo ?? "");
  const [fromPlaceId, setFromPlaceId] = useState<string | null>(null);
  const [toPlaceId, setToPlaceId] = useState<string | null>(null);
  const [datetimeLocal, setDatetimeLocal] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [km, setKm] = useState<number | null>(null);
  const [travelSeconds, setTravelSeconds] = useState<number | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  const canSubmit = Boolean(name.trim() && phone.trim() && fromText.trim() && toText.trim());

  const pricesByClass = useMemo(() => {
    const calcFor = (klass: CarClass) => {
      if (routeType === "city") return CITY_BASE_PRICE[klass];
      if (!km) return null;

      let total = Math.round(km * PER_KM[klass]);

      if (routeType === "airport") total = Math.round(total * 1.1);
      if (roundTrip) total *= 2;

      return total;
    };

    return {
      standard: calcFor("standard"),
      comfort: calcFor("comfort"),
      business: calcFor("business"),
      minivan: calcFor("minivan"),
    };
  }, [routeType, km, roundTrip]);

  const finalPrice = pricesByClass[carClass];

  const travelTimeText = useMemo(() => {
    if (travelSeconds == null || !Number.isFinite(travelSeconds) || travelSeconds <= 0) {
      return null;
    }
    return formatDurationRU(travelSeconds);
  }, [travelSeconds]);

  const tripTitle =
    fromText.trim() && toText.trim()
      ? `${fromText.trim()} → ${toText.trim()}`
      : routeType === "airport"
        ? "Аэропорт → Город"
        : routeType === "city"
          ? "Поездка по городу"
          : "Межгородний маршрут";

  function swapPlaces() {
    setFromText(toText);
    setToText(fromText);
    setFromPlaceId(toPlaceId);
    setToPlaceId(fromPlaceId);
  }

  function applyQuickTime(kind: "plus1" | "today18" | "tomorrow10") {
    const now = new Date();
    let d = now;

    if (kind === "plus1") d = addMinutes(now, 60);
    if (kind === "today18") d = setTimeSameDay(now, 18, 0);
    if (kind === "tomorrow10") {
      const t = new Date(now.getTime());
      t.setDate(t.getDate() + 1);
      d = setTimeSameDay(t, 10, 0);
    }

    setDatetimeLocal(toDatetimeLocal(d));
  }

  async function requestDistance(
    from: string,
    to: string,
    opts?: { fromPlaceId?: string | null; toPlaceId?: string | null; signal?: AbortSignal }
  ) {
    const res = await fetch("/api/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: opts?.signal,
      body: JSON.stringify({
        from,
        to,
        fromPlaceId: opts?.fromPlaceId ?? null,
        toPlaceId: opts?.toPlaceId ?? null,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data?.error || "Не удалось рассчитать расстояние");
    }

    return {
      km: Number(data.km) || null,
      seconds: Number(data.seconds) || null,
    };
  }

  async function calculateRoute() {
    setCalcError(null);
    setError(null);

    const from = fromText.trim();
    const to = toText.trim();

    if (!from || !to) {
      setCalcError("Введите точки маршрута");
      setKm(null);
      setTravelSeconds(null);
      return;
    }

    const nextType: RouteType =
      looksLikeAirport(from) || looksLikeAirport(to)
        ? "airport"
        : sameCity(from, to)
          ? "city"
          : "intercity";

    if (routeType !== nextType) {
      onRouteTypeChange(nextType);
    }

    setCalcLoading(true);

    try {
      const data = await requestDistance(from, to, { fromPlaceId, toPlaceId });
      setKm(data.km);
      setTravelSeconds(data.seconds);
    } catch (e: unknown) {
      setKm(null);
      setTravelSeconds(null);
      setCalcError(e instanceof Error ? e.message : "Не удалось рассчитать расстояние");
    } finally {
      setCalcLoading(false);
    }
  }

  useEffect(() => {
    const from = fromText.trim();
    const to = toText.trim();

    if (!from || !to) {
      setCalcError(null);
      setKm(null);
      setTravelSeconds(null);
      setCalcLoading(false);
      return;
    }

    const nextType: RouteType =
      looksLikeAirport(from) || looksLikeAirport(to)
        ? "airport"
        : sameCity(from, to)
          ? "city"
          : "intercity";

    if (routeType !== nextType) {
      onRouteTypeChange(nextType);
    }

    let cancelled = false;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setCalcError(null);
      setError(null);
      setCalcLoading(true);

      try {
        const data = await requestDistance(from, to, {
          fromPlaceId,
          toPlaceId,
          signal: controller.signal,
        });

        if (cancelled) return;

        setKm(data.km);
        setTravelSeconds(data.seconds);
      } catch (e: unknown) {
        if (cancelled) return;
        if (e instanceof Error && e.name === "AbortError") return;

        setKm(null);
        setTravelSeconds(null);
        setCalcError(e instanceof Error ? e.message : "Не удалось рассчитать расстояние");
      } finally {
        if (!cancelled) setCalcLoading(false);
      }
    }, 450);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [fromText, toText, fromPlaceId, toPlaceId, routeType, onRouteTypeChange]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Заполните имя, телефон, откуда и куда.");
      return;
    }

    setLoading(true);

    try {
      const calcNote =
        finalPrice != null
          ? `\n\n[Авторасчёт]${roundTrip ? " туда-обратно" : ""}${travelTimeText ? ` (~${travelTimeText})` : ""}: ${formatRub(finalPrice)}`
          : "";

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        from: fromText.trim(),
        to: toText.trim(),
        datetime: datetimeLocal || null,
        routeType,
        carClass,
        roundTrip,
        company: "",
        price: finalPrice != null ? String(finalPrice) : null,
        distanceKm: km != null ? String(Math.round(km)) : null,
        comment: ((comment.trim() || "") + calcNote).trim() || null,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Ошибка отправки");
      }

      router.push("/thanks");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <div className="rounded-[24px] bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.06)] ring-1 ring-black/5">
        <div className="grid gap-2.5">
          <div className="grid grid-cols-3 gap-2 rounded-[20px] bg-zinc-50 p-2">
            <TypeTab
              active={routeType === "airport"}
              label="Аэропорт"
              icon={<IconPlane />}
              onClick={() => onRouteTypeChange("airport")}
            />
            <TypeTab
              active={routeType === "intercity"}
              label="Межгород"
              icon={<IconCar />}
              onClick={() => onRouteTypeChange("intercity")}
            />
            <TypeTab
              active={routeType === "city"}
              label="Город"
              icon={<IconCity />}
              onClick={() => onRouteTypeChange("city")}
            />
          </div>

          <div className="grid gap-2">
            <div>
              <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
                Откуда
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-zinc-500">
                  <IconPin />
                </div>
                <GooglePlacesInput
                  className="h-10 w-full rounded-[16px] border border-zinc-200 bg-white pl-10 pr-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  value={fromText}
                  onValueChange={(v) => {
                    setFromText(v);
                    setFromPlaceId(null);
                  }}
                  onPlacePick={({ placeId, address }) => {
                    setFromText(address);
                    setFromPlaceId(placeId);
                  }}
                  placeholder="Город, адрес, аэропорт"
                />
              </div>
            </div>

            <div className="relative pt-1">
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={swapPlaces}
                  className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition hover:text-blue-600"
                >
                  <IconSwap />
                </button>
              </div>

              <div>
                <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
                  Куда
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-zinc-500">
                    <IconPin />
                  </div>
                  <GooglePlacesInput
                    className="h-10 w-full rounded-[16px] border border-zinc-200 bg-white pl-10 pr-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                    value={toText}
                    onValueChange={(v) => {
                      setToText(v);
                      setToPlaceId(null);
                    }}
                    onPlacePick={({ placeId, address }) => {
                      setToText(address);
                      setToPlaceId(placeId);
                    }}
                    placeholder="Город, адрес, аэропорт"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={calculateRoute}
              disabled={calcLoading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:opacity-95 disabled:opacity-70"
            >
              <span>{calcLoading ? "Считаем..." : "Рассчитать маршрут"}</span>
              <IconPlane />
            </button>
          </div>

          <div className="rounded-[20px] border border-zinc-200 bg-white p-3 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div>
                <div className="text-[15px] font-black leading-tight text-zinc-900">
                  {tripTitle}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-zinc-600">
                  {calcLoading ? <span>Считаем маршрут…</span> : null}
                  {!calcLoading && calcError ? (
                    <span className="text-rose-600">{calcError}</span>
                  ) : null}
                  {!calcLoading && !calcError && km ? (
                    <span className="font-semibold text-orange-500">~ {Math.round(km)} км</span>
                  ) : null}
                  {!calcLoading && !calcError && km && travelTimeText ? <span>•</span> : null}
                  {!calcLoading && !calcError && travelTimeText ? (
                    <span>~ {travelTimeText}</span>
                  ) : null}
                  {!calcLoading && !calcError && !km && routeType === "city" ? (
                    <span>{formatFrom(CITY_BASE_PRICE[carClass])}</span>
                  ) : null}
                  {!calcLoading && !calcError && !km && routeType !== "city" ? (
                    <span>Маршрут считается автоматически</span>
                  ) : null}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
                  цена
                </div>
                <div className="text-[16px] font-black text-zinc-950">
                  {finalPrice != null
                    ? formatRub(finalPrice)
                    : routeType === "city"
                      ? formatFrom(CITY_BASE_PRICE[carClass])
                      : "—"}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[12px] text-zinc-600 sm:justify-end">
                  <IconCar />
                  <span>
                    {carClass === "standard"
                      ? "Стандарт"
                      : carClass === "comfort"
                        ? "Комфорт"
                        : carClass === "business"
                          ? "Бизнес"
                          : "Минивен"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              <CarClassCard
                active={carClass === "standard"}
                title="Стандарт"
                price={
                  pricesByClass.standard != null
                    ? formatRub(pricesByClass.standard)
                    : routeType === "city"
                      ? formatFrom(CITY_BASE_PRICE.standard)
                      : "—"
                }
                onClick={() => onCarClassChange("standard")}
              />
              <CarClassCard
                active={carClass === "comfort"}
                title="Комфорт"
                price={
                  pricesByClass.comfort != null
                    ? formatRub(pricesByClass.comfort)
                    : routeType === "city"
                      ? formatFrom(CITY_BASE_PRICE.comfort)
                      : "—"
                }
                onClick={() => onCarClassChange("comfort")}
              />
              <CarClassCard
                active={carClass === "business"}
                title="Бизнес"
                price={
                  pricesByClass.business != null
                    ? formatRub(pricesByClass.business)
                    : routeType === "city"
                      ? formatFrom(CITY_BASE_PRICE.business)
                      : "—"
                }
                onClick={() => onCarClassChange("business")}
              />
              <CarClassCard
                active={carClass === "minivan"}
                title="Минивен"
                price={
                  pricesByClass.minivan != null
                    ? formatRub(pricesByClass.minivan)
                    : routeType === "city"
                      ? formatFrom(CITY_BASE_PRICE.minivan)
                      : "—"
                }
                onClick={() => onCarClassChange("minivan")}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
              Дата и время
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <IconCalendar />
              </div>
              <input
                className="h-10 w-full rounded-[16px] border border-zinc-200 bg-white pl-10 pr-3 text-[14px] text-zinc-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                type="datetime-local"
                value={datetimeLocal}
                onChange={(e) => setDatetimeLocal(e.target.value)}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyQuickTime("plus1")}
                className="h-9 rounded-full border border-zinc-200 bg-white px-3 text-[12px] font-bold text-zinc-700"
              >
                Через 1 час
              </button>
              <button
                type="button"
                onClick={() => applyQuickTime("today18")}
                className="h-9 rounded-full border border-zinc-200 bg-white px-3 text-[12px] font-bold text-zinc-700"
              >
                Сегодня 18:00
              </button>
              <button
                type="button"
                onClick={() => applyQuickTime("tomorrow10")}
                className="h-9 rounded-full border border-zinc-200 bg-white px-3 text-[12px] font-bold text-zinc-700"
              >
                Завтра 10:00
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
                Ваше имя
              </label>
              <input
                className="h-10 w-full rounded-[16px] border border-zinc-200 bg-white px-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
                Телефон
              </label>
              <input
                className="h-10 w-full rounded-[16px] border border-zinc-200 bg-white px-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                value={phone}
                onChange={(e) => setPhone(normalizePhoneLive(e.target.value))}
                placeholder="+7 (___) ___-__-__"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-extrabold text-zinc-900">
              Комментарий
            </label>
            <textarea
              className="min-h-[68px] w-full rounded-[16px] border border-zinc-200 bg-white px-3 py-2.5 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Детское кресло, багаж, рейс..."
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-[14px] font-bold text-zinc-800">
              <input
                type="checkbox"
                checked={roundTrip}
                onChange={(e) => setRoundTrip(e.target.checked)}
                className="h-5 w-5 rounded-md border-zinc-300 accent-blue-600"
              />
              Туда-обратно
            </label>

            <button
              disabled={loading || !canSubmit}
              className="ml-auto flex h-10 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-blue-600 to-sky-500 px-5 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{loading ? "Отправляем…" : "Оформить заказ"}</span>
              <IconArrowRight />
            </button>
          </div>

          {error ? (
            <div className="rounded-[16px] border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">
              {error}
            </div>
          ) : null}

          <div className="text-[10px] leading-4 text-zinc-500">
            Нажимая «Оформить заказ», вы соглашаетесь с{" "}
            <a href="/privacy" className="underline decoration-zinc-300">
              политикой конфиденциальности
            </a>{" "}
            и{" "}
            <a href="/personal-data" className="underline decoration-zinc-300">
              обработкой персональных данных
            </a>.
          </div>
        </div>
      </div>
    </form>
  );
}