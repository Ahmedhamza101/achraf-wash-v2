import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cities } from "./data";

type StepDateProps = {
  date: string;
  time: string;
  onUpdate: (
    payload: Partial<Omit<StepDateProps, "onUpdate" | "time">> & {
      time?: string;
    },
  ) => void;
  onPrevious: () => void;
  onNext: () => void;
};

const times = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export function StepDate({
  date,
  time,
  onUpdate,
  onPrevious,
  onNext,
}: StepDateProps) {
  const isValid = date.trim().length > 0 && time.trim().length > 0;

  return (
    <Card className="rounded-[2rem] border-gray-200 p-6 shadow-sm">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-3xl font-semibold text-gray-900">
          Emplacement et horaires
        </CardTitle>
        <p className="text-gray-600 mt-2">Quand souhaitez-vous le lavage ?</p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="ml-full grid gap-6 xl:grid-cols-2">
          <div className="space-y-6 rounded-[2rem] border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-xl font-semibold text-gray-900">Date</h3>
            <input
              type="date"
              value={date}
              onChange={(event) => onUpdate({ date: event.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500"
            />
            <h3 className="text-xl font-semibold text-gray-900">Horaire</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {times.map((slot) => {
                const active = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onUpdate({ time: slot })}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onPrevious}
          >
            Précédent
          </Button>
          <Button
            type="button"
            className="w-50 ml-220 bg-blue-600 text-white hover:bg-blue-700"
            onClick={onNext}
            disabled={!isValid}
          >
            Suivant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
