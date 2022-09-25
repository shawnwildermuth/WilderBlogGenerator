<template>
  <div v-cloak>
    <div>
      <div
        v-if="isBusy"
        class="w-full bg-red-500 p-1 text-center text-white rounded"
      >
        <small><i class="fas fa-circle-notch fa-spin"></i> Sending...</small>
      </div>
      <form
        novalidate
        v-on:submit.prevent="onSubmit()"
        id="contact-form"
        class="form"
      >
        <label for="name">Your Name</label>
        <div>
          <input
            type="text"
            v-model="model.name.$model"
            placeholder="e.g. John Smith"
            autofocus
            name="name"
            :class="{ error: model.name.$invalid }"
          />
          <ModelError :model="model.name" />
        </div>
        <label for="email">Email</label>
        <div>
          <input
            type="email"
            v-model="model.email.$model"
            placeholder="e.g. john@aol.com"
            name="email"
            :class="{ error: model.email.$invalid }"
          />
          <ModelError :model="model.email" />
        </div>
        <label for="subject">Subject</label>
        <div>
          <select
            v-model="model.subject.$model"
            name="subject"
            :class="{ error: model.subject.$invalid }"
          >
            <option v-for="s in subjects" :key="s" :value="s">
              {{ s }}
            </option>
          </select>
          <ModelError :model="model.subject" />
        </div>
        <label for="msg">Message</label>
        <div>
          <textarea
            rows="3"
            cols="40"
            name="msg"
            v-model="model.msg.$model"
            placeholder="e.g. Hey Shawn, you magnificent beast."
            :class="{ error: model.msg.$invalid }"
          ></textarea>
          <ModelError :model="model.msg" />
        </div>
        <div>
          <button
            class="btn btn-success ml-0"
            :disabled="model.$invalid || isBusy"
          >
            Send Email</button
          >&nbsp;
          <a href="/" class="btn p-2">Cancel</a>
        </div>
        <div>
          <div v-if="status" class="text-primary">{{ status }}</div>
          <div v-if="error" class="text-warning">{{ error }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import ModelError from "../components/ModelError.vue";
import ContactMail from "./ContactMail";
import { subjects } from "../lookups";
import http from "./http";
import logger from "../logger";

export default defineComponent({
  components: {
    ModelError,
  },
  setup() {
    const error = ref("");
    const isBusy = ref(false);
    const status = ref("");
    const mail: Ref<ContactMail> = ref(new ContactMail());
    const model = mail.value.getModel();

    async function onSubmit() {
      logger.log(`Starting Submit`);

      // reset
      status.value = "";
      isBusy.value = false;
      error.value = "";

      // Validate
      if (model.value.$validate && (await model.value.$validate())) {
        // Save
        isBusy.value = true;
        logger.log(`Sending Mail...`, mail.value);
        if (await http.sendMail(mail)) {
          model.value.$reset();
          mail.value.reset();
          status.value = "Message Sent...";
          logger.log(`Mail Sent`);
        } else {
          error.value = "Failed to send message...";
          logger.log(`Mail failed`);
        }
        isBusy.value = false;
      }
    }

    return {
      model,
      error,
      isBusy,
      subjects,
      status,
      onSubmit,
    };
  },
});
</script>
