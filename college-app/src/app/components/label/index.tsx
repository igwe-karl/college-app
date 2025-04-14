import { Label as LabelUI } from "@/components/ui/label";

export function Label({ title }: { title: string }) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <LabelUI htmlFor="terms">{title}</LabelUI>
      </div>
    </div>
  );
}
