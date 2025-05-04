import { sendEmail } from "./EmailJS/send";

function submitHandler(text: string) {
  console.log(text);
  sendEmail(text);
}

export { submitHandler };
