import "~/store";

import { useAtom } from "jotai";
import { BrowserRouter } from "react-router-dom";

import SvgIcon from "~/components/SvgIcon";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { allConfigAtom, editingAtom } from "~/store";

import { MonthSchedule } from "./schedule/month";

// import SvgIcon from "~/components/SvgIcon";

const Main = () => {
  const [editing, setEditing] = useAtom(editingAtom);
  const [eventFontSize, setEventFontSize] = useAtom(allConfigAtom["font-size"]);
  const [pageMargin, setPageMargin] = useAtom(allConfigAtom["page-margin"]);

  return (
    <div className="flex bg-gray-100">
      <div className="z-10 h-screen w-60 bg-white shadow-xl">
        <div className="mb-4 bg-slate-100">
          <div className="flex items-center justify-evenly py-4">
            <Button onClick={() => setEditing((v) => !v)}>
              <SvgIcon className="mr-2 fill-white" name={editing ? "preview" : "edit"} />
              {editing ? "Preview" : "Edit"}
            </Button>
            <Button>
              <SvgIcon className="mr-2 fill-white" name="print" />
              Print
            </Button>
          </div>
        </div>
        <div className="config-row">
          <p>page margin:</p>
          <Slider
            min={0}
            max={50}
            step={0.1}
            value={[pageMargin]}
            onValueChange={(v) => setPageMargin(v[0])}
          >
            {pageMargin}px
          </Slider>
        </div>
        <div className="config-row">
          <p>font size:</p>
          <Slider
            min={1}
            max={24}
            step={0.1}
            value={[eventFontSize]}
            onValueChange={(v) => setEventFontSize(v[0])}
          >
            {eventFontSize}px
          </Slider>
        </div>
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
