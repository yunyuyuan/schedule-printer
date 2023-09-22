import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";

import SvgIcon from "~/components/SvgIcon";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Slider } from "~/components/ui/slider";
import { allConfigAtom } from "~/store";
import { colorIsValid } from "~/utils";

const ConfigRow = (props: React.PropsWithChildren<{ name: string }>) => {
  return (
    <div className="mb-3 w-full border-b border-dashed border-gray-400 px-2 pb-3">
      <p className="mb-1.5 text-sm">{props.name}:</p>
      {props.children}
    </div>
  );
};

function CheckboxConfig(props: {
  name: string;
  value: boolean;
  onValueChange: (_: boolean) => any;
}) {
  return (
    <label className="mb-3 flex w-full cursor-pointer items-center border-b border-dashed border-gray-400 px-2 pb-3 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      <Checkbox
        className="mr-1.5"
        checked={props.value}
        onCheckedChange={props.onValueChange}
        id="terms"
      />
      {props.name}
    </label>
  );
}

function SliderConfig(props: {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (_: number) => any;
  disabled?: boolean;
  unit?: string;
}) {
  return (
    <ConfigRow name={props.name}>
      <Slider
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        step={props.step}
        value={[props.value]}
        onValueChange={(v) => props.onValueChange(v[0])}
      >
        {props.value}
        {props.unit || "px"}
      </Slider>
    </ConfigRow>
  );
}

function ColorConfig(props: { name: string; value: string; onValueChange: (_: string) => any }) {
  const [tempValue, setTempValue] = useState(props.value);
  useEffect(() => {
    setTempValue(props.value);
  }, [props.value]);
  const inputChange = (color: string) => {
    setTempValue(color);
    if (colorIsValid(color)) {
      props.onValueChange(color);
    }
  };
  const validColor = () => {
    if (!colorIsValid(tempValue)) {
      setTempValue(props.value);
    }
  };

  return (
    <ConfigRow name={props.name}>
      <div className="flex items-center">
        <Input
          className="mr-2"
          value={tempValue}
          onChange={(e) => inputChange(e.target.value)}
          onBlur={validColor}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button className="shrink-0" size="icon">
              <SvgIcon className="fill-white" name="palette" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="m-2 w-auto p-0">
            <ChromePicker color={props.value} onChange={(e) => inputChange(e.hex)}></ChromePicker>
          </PopoverContent>
        </Popover>
      </div>
    </ConfigRow>
  );
}

export function Config() {
  const [eventFontSize, setEventFontSize] = useAtom(allConfigAtom["font-size"]);
  const [calHeaderSize, setCalHeaderSize] = useAtom(allConfigAtom["cal-header-height"]);
  const [pageMargin, setPageMargin] = useAtom(allConfigAtom["page-margin"]);
  const [cellBorderColor, setCellBorderColor] = useAtom(allConfigAtom["cell-border-color"]);
  const [calHeaderColor, setCalHeaderColor] = useAtom(allConfigAtom["cal-header-bg"]);
  const [showHeader, setShowHeader] = useAtom(allConfigAtom["show-header"]);
  const [headerFontSize, setHeaderFontSize] = useAtom(allConfigAtom["header-font-size"]);

  return (
    <>
      <CheckboxConfig name="show header" value={showHeader} onValueChange={setShowHeader} />
      <SliderConfig
        name="header font size"
        min={1}
        max={50}
        step={0.1}
        disabled={!showHeader}
        value={headerFontSize}
        onValueChange={setHeaderFontSize}
      />
      <SliderConfig
        name="page margin"
        min={1}
        max={50}
        step={0.1}
        value={pageMargin}
        onValueChange={setPageMargin}
      />
      <SliderConfig
        name="font size"
        min={1}
        max={24}
        step={0.1}
        value={eventFontSize}
        onValueChange={setEventFontSize}
      />
      <SliderConfig
        name="calendar header size"
        min={16}
        max={128}
        step={1}
        value={calHeaderSize}
        onValueChange={setCalHeaderSize}
      />
      <ColorConfig name="border color" value={cellBorderColor} onValueChange={setCellBorderColor} />
      <ColorConfig
        name="calendar header background"
        value={calHeaderColor}
        onValueChange={setCalHeaderColor}
      />
    </>
  );
}
