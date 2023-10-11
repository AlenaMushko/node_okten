import { EEmailAction } from "../enums/email.action.enum";

export const templates = {
  [EEmailAction.REGISTER]: {
    templateName: "register",
    subject: "Hello, great to see you in our app",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Do not worry, we control your password",
  },
  [EEmailAction.RESET_PASSWORD]: {
    templateName: "reset-password",
    subject: "Congratulations you successfully resetting your password",
  },
  [EEmailAction.WELCOME]: {
    templateName: "welcome",
    subject: "Congratulations, you have successfully verified",
  },
};
