import { Textarea as TextareaUI } from "@/components/ui/textarea"

export function Textarea({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div>
      <label>{label}</label>
      <TextareaUI placeholder={placeholder} />
    </div>
  );
}
