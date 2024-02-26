"use client";
import "@/src/app/[locale]/styles/language.css";
import {useLocale} from "next-intl";
import {ChangeEvent, useTransition} from "react";
import {useRouter, usePathname} from "@/src/navigation";
import {DataLanguage} from "@/src/app/[locale]/data";
import {useParams} from 'next/navigation';

const Language = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(params)
    startTransition(() => {
      router.replace({pathname}, {locale: e.target.value});
    });
  };

  return <label className="language">
    {DataLanguage().title}
    <select
      className="select_language"
      onChange={handleChange}
      defaultValue={locale}
      disabled={isPending}
    >
      {DataLanguage().list.map((lang, index) => <option key={index} value={lang.value}>{lang.name}</option>)}
    </select>
  </label>
};
export default Language;