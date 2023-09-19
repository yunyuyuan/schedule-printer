import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { mapValues } from "lodash";

const allConfig = {
  "page-margin": 20,
  "cell-border-color": "#aaaaaa",
  "font-size": 16,
};

export type AllConfigKeys = keyof typeof allConfig;

export const allConfigAtom = mapValues(allConfig, (v, k) => atomWithStorage(k, v)) as {
  [K in AllConfigKeys]: ReturnType<typeof atomWithStorage<(typeof allConfig)[K]>>;
};

export const editingAtom = atom(false);
