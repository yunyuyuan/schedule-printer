import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { mapValues } from "lodash";

export const allConfig = {
  "page-margin": 20,
  "cell-border-color": "#aaaaaa",
  "cal-header-bg": "#dddddd",
  "font-size": 16,
  "cal-header-height": 24,
  "show-header": true,
  "header-font-size": 32,
};

export type AllConfigKeys = keyof typeof allConfig;

export const allConfigAtom = mapValues(allConfig, (v, k) => atomWithStorage(k, v)) as {
  [K in AllConfigKeys]: ReturnType<typeof atomWithStorage<(typeof allConfig)[K]>>;
};

export const editingAtom = atom(false);
export const dateAtom = atom(dayjs());
