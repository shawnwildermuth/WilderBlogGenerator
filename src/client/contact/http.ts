import axios from "axios";
import { Ref } from 'vue';
import ContactMail from './ContactMail';

export default {
  sendMail: async (mail: Ref<ContactMail>) => {
    try {
      console.log(process.env.VUE_APP_CONTACTAPIPREFIX);
      var result = await axios.post<boolean>(process.env.VUE_APP_CONTACTAPIPREFIX + `ContactTemplate.txt`, mail.value);
      return result.data;
    } catch {
      return false;
    } 
  }
};