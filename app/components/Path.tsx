"use client";

import "../styles/path.css";
import Link from "next/link";
import {useAppSelector} from "@/app/store/hooks";
import {Fragment} from "react";

type PageProps = {
  page?: string;
}

const Path = ({page}: PageProps) => {
  const section = useAppSelector(state => state.product.section);

  return <div className="path">
    <Link href="/" className="path_link">Главная</Link>
    <span> / </span>
    {section.title && <Fragment>
      <Link href={`/${section.path}`} className="path_link">{section.title}</Link>
      <span> / </span>
    </Fragment>
    }
    <span>{page}</span>
  </div>
}
export default Path;