export type modelStatus = {
  drawer: boolean;
  mode?: modeVariantType;
  status: modelStatusType;
  data: any;
};

export type modeVariantType = "dark" | "light";

export type modelStatusType =
  | "close"
  | "signIn"
  | "signUp"
  | "forget-password"
  | "new-contact"
  | "leader-board"
  | "game-start"
  | "game-end";
