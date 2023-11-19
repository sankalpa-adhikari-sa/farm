import pb from "@/Pocketbase/pocketbase";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const isAuthenticatedAtom = atom(pb.authStore.isValid);
export const isAuthenticating = atom(false);
export const isUserCreating = atom(false);
export const sidebarAtom = atomWithStorage("isSidebarOpen", false);
