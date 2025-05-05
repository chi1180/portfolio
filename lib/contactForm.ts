import { sendEmail } from "./EmailJS/send";

function submitHandler(text: string) {
  sendEmail(text);
}

export { submitHandler };
