export const formatDate = (date) => date.toISOString().slice(0, 10);

export const formatTime = (time) => time ?? "00:00";

export const formatHumanDate = (date) =>
  new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(date);

export const formatWeekTitle = (date) =>
  new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

export const formatShortDate = (date) =>
  new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);

export const formatFullDate = (date) =>
  new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

export const weekDaysFrom = (date) => {
  const current = new Date(date);
  const day = current.getDay();
  const mondayIndex = day === 0 ? -6 : 1;
  const monday = new Date(current);
  monday.setDate(current.getDate() - day + mondayIndex);
  return Array.from({ length: 7 }, (_, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    return d;
  });
};
