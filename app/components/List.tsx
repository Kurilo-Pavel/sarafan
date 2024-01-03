"use client";

import Link from "next/link";
import {useAppDispatch} from "@/app/store/hooks";
import {setSection} from "@/app/store/product/productSlice";

type ListProps = {
  list: { title: string, path: string }[];
  classNameLi?: string;
  classNameUl?: string;
  title?: string;
  classNameTitle?: string;
  myPage: boolean;
}

const List = ({list, classNameUl, classNameLi, title, classNameTitle, myPage}: ListProps) => {
    const dispatch = useAppDispatch();
    const handleClick = (span:{title:string,path:string}) => {
      if (myPage) {
        dispatch(setSection({title: span.title, path: span.path}));
      }
    };
    return <div className={classNameUl}>
      {title && <span className={classNameTitle}>{title}</span>}
      {list.map(span => {
        return <Link
          key={span.title}
          href={`/${span.path}`}
          className={classNameLi}
          onClick={() => handleClick(span)}
        >
          {span.title}
        </Link>
      })}
    </div>
  }
;

export default List;