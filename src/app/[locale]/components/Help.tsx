import HelpClient from "@/src/app/[locale]/components/HelpClient";

type HelpProps = {
  cart: boolean;
  data?: { title: string, content: { title: string, text: string }[] };
}

const Help = ({cart, data}: HelpProps) => {
  return <HelpClient cart={cart} data={data} />
};
export default Help;