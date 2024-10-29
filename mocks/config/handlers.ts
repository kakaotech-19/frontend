import { http, HttpResponse } from "msw";
import { authMockups } from "../domain/auth";

const url = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [...authMockups];
