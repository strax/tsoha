import * as React from "react";
import HelloController from "../controllers/HelloController";
import { withLayout } from "./layout";

export const index = withLayout(() => <h1>Hello world from React!</h1>);
