import {
  Accordion as AccordionUi,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Accordion({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <AccordionUi
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {items.map((item, index) => (
        <AccordionItem value={`item-${index + 1}`}>
          <AccordionTrigger className="text-lg font-semibold">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{item.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionUi>
  );
}
