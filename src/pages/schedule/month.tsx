import dayjs, { Dayjs } from "dayjs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { useMount } from "react-use";

import SvgIcon from "~/components/SvgIcon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { eventMapAtom } from "~/event";
import { allConfigAtom, editingAtom } from "~/store";

export const MonthSchedule = () => {
  const pageMargin = useAtomValue(allConfigAtom["page-margin"]);
  const cellBorderColor = useAtomValue(allConfigAtom["cell-border-color"]);

  const setEventMap = useSetAtom(eventMapAtom);
  const [weeks, setWeeks] = useState<Dayjs[][]>([]);

  useMount(() => {
    // clear
    setEventMap((list) => {
      list.clear();
      return list;
    });

    const day = dayjs().startOf("month");

    const newWeeks: typeof weeks = [];
    const addDayToWeek = (day: Dayjs) => {
      const current = newWeeks[newWeeks.length - 1];
      if (current?.length < 7) {
        current.push(day);
      } else {
        newWeeks.push([day]);
      }
    };

    // before
    for (let i = (day.day() + 6) % 7; i > 0; i--) {
      addDayToWeek(day.add(-i, "day"));
    }
    for (let i = 0; i < day.daysInMonth(); i++) {
      const newDay = day.add(i, "day");
      addDayToWeek(newDay);
      setEventMap((list) => list.set(newDay, []));
    }
    // after
    const lastDay = dayjs().endOf("month");
    for (let i = 1; i <= 7 - newWeeks[newWeeks.length - 1].length; i++) {
      addDayToWeek(lastDay.add(i, "day"));
    }

    setWeeks(newWeeks);
  });

  return (
    <div className="h-screen w-[calc(100%-15rem)] overflow-auto">
      <div
        className="m-8 bg-white a4-paper"
        style={{
          padding: `${pageMargin}px`,
        }}
      >
        <div
          className="flex h-full w-full flex-col border-l border-t"
          style={{
            borderColor: cellBorderColor,
          }}
        >
          <div className="flex w-full">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((k) => (
              <div
                key={k}
                className="monthly-cell items-center justify-center"
                style={{
                  borderColor: cellBorderColor,
                }}
              >
                {k}
              </div>
            ))}
          </div>
          {weeks.map((week, idx) => (
            <div key={idx} className="flex w-full flex-1">
              {week.map((day, idx) => (
                <MonthCell key={idx} day={day}></MonthCell>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function MonthCell(props: { day: Dayjs }) {
  const editing = useAtomValue(editingAtom);
  const [eventMap, setEventMap] = useAtom(eventMapAtom);
  const validDay = eventMap.has(props.day);

  const cellBorderColor = useAtomValue(allConfigAtom["cell-border-color"]);
  const eventFontSize = useAtomValue(allConfigAtom["font-size"]);

  const addEvent = () => {
    setEventMap((v) => {
      v.get(props.day)!.push("");
      return new Map(v);
    });
  };
  const inputEvent = (idx: number, e: any) => {
    setEventMap((v) => {
      v.get(props.day)!.splice(idx, 1, e.target.value);
      return new Map(v);
    });
  };

  return (
    <div
      className="monthly-cell"
      style={{
        borderColor: cellBorderColor,
      }}
    >
      <div className="flex h-8 items-center pl-1">
        <span className={`${validDay ? "text-black" : "text-gray-400"}`}>
          {props.day.format("D")}
        </span>
        {validDay && editing && (
          <Button className="ml-auto" size="icon" variant="secondary" onClick={() => addEvent()}>
            <SvgIcon className="stroke-zinc-600" name="add" />
          </Button>
        )}
      </div>
      <ul className="w-full list-none">
        {eventMap.get(props.day)?.map((event, idx) => (
          <li
            className="px-1.5 pt-1 first-of-type:pt-0"
            style={{
              fontSize: eventFontSize + "px",
            }}
            key={idx}
          >
            {editing ? (
              <Input
                className="w-full"
                placeholder="please input"
                value={event}
                onChange={(e) => inputEvent(idx, e)}
              />
            ) : (
              <div
                className="flex items-start"
                style={{
                  lineHeight: eventFontSize * 1.5 + "px",
                }}
              >
                <span
                  className="flex shrink-0 items-center"
                  style={{
                    width: eventFontSize * 1.5 + "px",
                    height: eventFontSize * 1.5 + "px",
                  }}
                >
                  <span
                    className="block rounded border border-solid border-gray-600"
                    style={{
                      width: eventFontSize + "px",
                      height: eventFontSize + "px",
                    }}
                  ></span>
                </span>
                <span className="whitespace-pre-line break-all">{event}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
