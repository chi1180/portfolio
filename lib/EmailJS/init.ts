import type { Options } from "@emailjs/browser/es/types/Options";
import emailjs from "@emailjs/browser";
import { logging } from "../logger";

const options: Options = {
  publicKey: process.env.NEXT_PUBLIC_publicKey,
  blockHeadless: true,
  limitRate: {
    id: "app",
    throttle: 1000 * 60 * 10, // Sending is blocked for 10 minits.
  },
};

function emailJsInit() {
  emailjs.init(options);
  logging("EmailJS initialized", "INFO");
}

export { emailJsInit };
