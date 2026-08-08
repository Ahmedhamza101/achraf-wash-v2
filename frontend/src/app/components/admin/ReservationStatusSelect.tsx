import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  RESERVATION_STATUSES,
  RESERVATION_STATUS_LABELS,
} from "./reservationStatus";

interface ReservationStatusSelectProps {
  value: string;
  disabled?: boolean;
  onChange: (status: string) => void;
}

export function ReservationStatusSelect({
  value,
  disabled,
  onChange,
}: ReservationStatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {RESERVATION_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {RESERVATION_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
