"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_BASE_URL = "http://localhost:3000/api/mobiles";

export const addProduct = async (data) => {
  await fetch(`${API_BASE_URL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidateTag("products");
  redirect("/");
};
export const deleteProduct = async (id) => {
  await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  revalidateTag("products");
  redirect("/");
};

export const editPost = async (id, formData) => {
  await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
  });
  revalidateTag("products");
  redirect("/");
};
