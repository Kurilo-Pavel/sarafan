import "@/src/app/[locale]/styles/pikingItems.css";
import {Fragment} from "react";
import Select from "@/src/app/[locale]/components/Select";
import {sortProduct} from "@/src/app/[locale]/store/product/productSlice";
import Button from "@/src/app/[locale]/components/Button";
import {useTranslations} from "next-intl";

type PikingItemProps = {
  setTypeSort: (value: string) => void;
};

const PikingItems = ({setTypeSort}: PikingItemProps) => {
  const dataSort = useTranslations("SelectData");
  const valueTypeSort = [
    {value: "new", name: dataSort("name1")},
    {value: "increase", name: dataSort("name2")},
    {value: "decrease", name: dataSort("name3")}
  ];
  const data = useTranslations("PikingItems");
  return <Fragment>
    <div className="filter">
      <Select
        className="select" arrayValue={valueTypeSort}
        disabledValue={data("sort")}
        setSort={setTypeSort}
        // setSort={(sort: string) => dispatch(sortProduct({category: id, type: sort, page: 1, locale: locale}))}
      />
      <Button text={data("filter")} className="button_gallery" type="button"/>
    </div>
  </Fragment>
};
export default PikingItems;