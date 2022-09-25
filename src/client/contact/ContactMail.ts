import { required, email, minLength } from "@vuelidate/validators";
import { notEqual } from "../validators";
import { subjects } from "../lookups";
import { useVuelidate } from "@vuelidate/core";
import isProduction from "../helpers/isProduction";

export default class ContactMail {

  constructor() {
    this.reset();
  }

  name = "";
  email = "";
  subject = "";
  msg = "";

  rules = {
    name: { required, minLength: minLength(5) },
    email: { required, email },
    subject: {
      required,
      minLength: minLength(5),
      notEqual: notEqual(subjects[0]),
    },
    msg: { required, minLength: minLength(20) }
  };

  getModel() {
    return useVuelidate(this.rules, this);
  }

  reset() {
    if (isProduction) {
      this.name = "";
      this.email = "";
      this.subject = "Pick One...";
      this.msg = "";
    } else {
      this.name = "Shawn Wildermuth";
      this.email = "shawn@wildermuth.com";
      this.subject = "Training";
      this.msg = "I want excellent training. I really, really do...";
    }
  }
}