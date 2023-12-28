/// <reference types="react-scripts" />

import { Theme } from "@emotion/react";
import { Interpolation } from "@emotion/serialize";

declare module "react" {
  type CssProp = Interpolation<Theme>;

  interface Attributes {
    css?: CssProp;
  }
}
