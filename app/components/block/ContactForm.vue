<script setup lang="ts">
import { navigateTo } from "#app";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define form schema with Zod
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.email("Please enter a valid email address"),
    message: z
      .string("A message is required")
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be less than 1000 characters"),
  })
);

// Initialize form with vee-validate
const form = useForm({
  validationSchema: formSchema,
});

// Form submission handler
const onSubmit = form.handleSubmit(async (values) => {
  try {
    // Create form data for Netlify
    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);

    // Submit to Netlify
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        formData as unknown as Record<string, string>
      ).toString(),
    });

    if (response.ok) {
      // Success - redirect to success page
      await navigateTo("/contact/success");
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    // Show error toast
    toast.error("Failed to send message", {
      description: "Please try again or contact me directly.",
    });
    console.error("Form submission error:", error);
  }
});
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
      <p class="text-muted-foreground">
        Have a project in mind or need help with wildlife conservation
        technology? I'd love to hear from you.
      </p>
    </div>

    <!-- Hidden form for Netlify detection -->
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message" />
    </form>

    <!-- Actual form -->
    <form class="space-y-6" name="contact" @submit="onSubmit">
      <input type="hidden" name="form-name" value="contact" />

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name *</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Your full name"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email *</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="your.email@example.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="message">
        <FormItem>
          <FormLabel>How can I help you? *</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell me about your project, the challenges you're facing, or how you'd like to collaborate..."
              class="min-h-[120px]"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="form.isSubmitting.value">
        {{ form.isSubmitting.value ? "Sending..." : "Send Message" }}
      </Button>
    </form>
  </div>
</template>
