"use client";

import "../styles/path.css";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {Fragment} from "react";
import {setSection} from "@/app/store/component/componentSlice";

type PageProps = {
  page?: string;
}

const Path = ({page}: PageProps) => {
  const dispatch = useAppDispatch();
  const section = useAppSelector(state => state.component.section);

  return <div className="path">
    <Link href="/" className="path_link">Главная</Link>
    <span> / </span>
    {section.title && <Fragment>
      <Link
        href={`/${section.path}`}
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