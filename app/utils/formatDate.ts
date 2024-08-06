import { LocaleCode } from "../[lang]/apiService/types";

export function formatDate({
  locale,
  date,
}: {
  locale: LocaleCode;
  date: Date;
}) {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}
