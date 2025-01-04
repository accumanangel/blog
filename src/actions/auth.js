"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Registers a new user with the provided form data.
 *
 * @param {Object} state - The current state (not used in this function).
 * @param {FormData} formData - The form data containing user registration details.
 * @returns {Promise<Object>} - An object containing errors if validation or registration fails, or redirects to the dashboard on success.
 */
export async function register(state, formData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  //check if email is already registered
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email already existin our database!" } };

  //hash the password
  const hashedPassword = await argon2.hash(password);

  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  //Create a session
  await createSession(results.insertedId.toString());

  console.log(results);
  redirect("/dashboard");
}

export async function login(state, formData) {
  // console.log(formData.get("email"));
  //validate the form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //if validation fails, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract validated data from validatedFormFields
  const { email, password } = validatedFields.data;

  // check if the email exists in the database
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });

  if (!existingUser) return { errors: { email: "Invalid Credentials!" } };

  // verify the password
  const passwordMatch = await argon2.verify(existingUser.password, password);

  // if password does not match, return an error
  if (!passwordMatch) return { errors: { email: "Invalid Credentials!" } };

  // create a session
  await createSession(existingUser._id.toString());

  console.log(existingUser._id.toString());

  // redirect to the dashboard
  redirect("/dashboard");
}

export async function logout() {
  // destroy the session
  const cookieStore = await cookies();
  cookieStore.delete("session");

  // redirect to the login page
  redirect("/login");
}
