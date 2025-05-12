import { getUserLocale } from "@/service/locale";
import { getRequestConfig } from "next-intl/server";

//@ts-ignore
export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
