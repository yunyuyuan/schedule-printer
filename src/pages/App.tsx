import "~/store";

import dayjs from "dayjs";
import { useAtom } from "jotai";
import { BrowserRouter } from "react-router-dom";

import SvgIcon from "~/components/SvgIcon";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { dateAtom, editingAtom } from "~/store";
import { print } from "~/utils";

import { Config } from "./config";
import { MonthSchedule } from "./schedule/month";

const Main = () => {
  const [editing, setEditing] = useAtom(editingAtom);
  const [date, setDate] = useAtom(dateAtom);

  const onDateChange = (v: Date) => {
    setDate(dayjs(v));
  };

  return (
    <div className="flex bg-gray-100">
      <div className="z-10 h-screen w-60 bg-white shadow-xl">
        <div className="mb-4 flex flex-col bg-slate-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <Button onClick={() => setEditing((v) => !v)}>
              <SvgIcon className="mr-2 fill-white" size={20} name={editing ? "preview" : "edit"} />
              {editing ? "Preview" : "Edit"}
            </Button>
            <Button onClick={print}>
              <SvgIcon className="mr-2 fill-white" size={20} name="print" />
              Print
            </Button>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start border-gray-400 text-left font-normal"
              >
                <SvgIcon size={20} className="mr-2 h-4 w-4 stroke-cyan-950" name="calendar" />
                {date ? date.format("YYYY/MM/DD") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date.toDate()}
                onSelect={(v) => v && onDateChange(v)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Config />
      </div>
      <MonthSchedule />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}
