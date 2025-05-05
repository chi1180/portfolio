import { logging } from "../logger";
import { emailJsInit } from "./init";
import emailjs from "@emailjs/browser";

const props = {
  serviceID: process.env.NEXT_PUBLIC_serviceID || "",
  templateID: process.env.NEXT_PUBLIC_templateID || "",
  templateParams: {
    message: "",
  },
};

function sendEmail(message: string) {
  props.templateParams.message = message;

  emailJsInit();

  logging(JSON.stringify(props.templateParams), "DEBUG");

  emailjs.send(props.serviceID, props.templateID, props.templateParams).then(
    (response) => {
      logging(
        `Email sent successfully\n${response.status}\n${response.text}`,
        "INFO",
      );
    },
    (error) => {
      logging(`Failed...\n${error}`, "ERROR");
    },
  );
}

export { sendEmail };
