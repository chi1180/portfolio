import { emailJsInit } from "./init";
import emailjs from "@emailjs/browser";

const props = {
  serviceID: process.env.serviceID || "",
  templateID: process.env.templateID || "",
  templateParams: {
    name: "message",
    notes: "",
  },
};

function sendEmail(message: string) {
  props.templateParams.notes = message;

  emailJsInit();

  emailjs.send(props.serviceID, props.templateID, props.templateParams).then(
    (response) => {
      console.log("Succeeded!", response.status, response.text);
    },
    (error) => {
      console.log("Failed...", error);
    },
  );
}
