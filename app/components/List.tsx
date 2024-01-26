"use client";

import Link from "next/link";

type ListProps = {
  list: { title: string, path: string }[];
  classNameLi?: string;
  classNameUl?: string;
  title?: string;
  classNameTitle?: string;
}

const List = ({list, classNameUl, classNameLi, title, classNameTitle}: ListProps) => {

    return <div className={classNameUl}>
      {title && <span className={classNameTitle}>{title}</span>}
      {list.map(span => {
        return <Link
          key={span.title}
          href={`/${span.path}`}
          className={classNameLi}
        >
          {span.title}
        </Link>
      })}
    </div>
  }
;

export default List;