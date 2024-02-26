"use client";
import "../styles/path.css";
import {Link} from "@/src/navigation";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {Fragment} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";
import {useLocale, useTranslations} from "next-intl";

type PageProps = {
  page?: string;
}

const Path = ({page}: PageProps) => {
  const dispatch = useAppDispatch();
  const section = useAppSelector(state => state.component.section);
  const locale = useLocale();
  const translation = useTranslations("Path");

  return <div className="path">
    <Link href="/" className="path_link">{translation("main")}</Link>
    <span> / </span>
    {section.title && <Fragment>
      <Link
        href={`/${section.path}` as "/"}
        locale={locale}
        className="path_link"
        onClick={() => dispatch(setSection({title: "", path: ""}))}
      >
        {section.title}
      </Link>
      <span> / </span>
    </Fragment>
    }
    <span>{page}</span>
  </div>
}
export default Path;