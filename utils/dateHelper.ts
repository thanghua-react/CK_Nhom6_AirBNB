// Date helpers shared by the date-picker page objects.
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function addDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY);
}

export function monthShort(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

export function monthFull(date: Date): string {
  return date.toLocaleString("en-US", { month: "long" });
}

// Parses text like "December 18, 2000" into a Date.
export function parseDateText(text: string): Date {
  const date = new Date(`${text} 12:00:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date text: "${text}". Expected format like "December 18, 2000".`);
  }
  return date;
}

// Extracts the digits of a price text such as "$120" -> 120.
export function parsePrice(text: string): number {
  return Number(text.replace(/[^\d]/g, ""));
}
