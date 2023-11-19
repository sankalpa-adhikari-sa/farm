import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const isAuthenticatedAtom = atom(false);
export const sidebarAtom = atomWithStorage("isSidebarOpen", false);
