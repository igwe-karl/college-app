import { Button as ButtonUI } from "@/components/ui/button";

export function Button({
  children,
  onClick,
  type,
  disabled,
  variant,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "outline" | "default";
}) {
  return (
    <ButtonUI type={type} onClick={onClick} disabled={disabled} variant={variant}>
      {children}
    </ButtonUI>
  );
}
