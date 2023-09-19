import { Dayjs } from "dayjs";
import { atom } from "jotai";

export const eventMapAtom = atom<Map<Dayjs, string[]>>(new Map());
