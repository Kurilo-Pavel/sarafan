"use client";

import Link from "next/link";
import {useAppDispatch} from "@/app/store/hooks";
import {setSection} from "@/app/store/product/productSlice";

type ListProps = {
  list: { title: string, path: string }[];
  classNameLi?: string;
  classNameUl?: string;
  title?: string;
  classNameTitle?:string;
}

const List = ({list, classNameUl, classNameLi, title, classNameTitle}: ListProps) => {
const dispatch =useAppDispatch();
  return <div className={classNameUl}>
    {title && <span className={classNameTitle}>{title}</span>}
    {list.map(span => {
      return <Link
        key={span.title}
        href={`/${span.path}`}
        className={classNameLi}
        onClick={() => {
         dispatch(setSection({title:span.title, path:span.path}));
        }}
      >
        {span.title}
      </Link>
    })}
  </div>
};

export default List;