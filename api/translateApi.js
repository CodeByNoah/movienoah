import { NextResponse as response } from "next/server";

export default async function translator(text) {
  const response = await fetch("https://api.one-api.ir/translate/v1/google/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "one-api-token": process.env.NEXT_PUBLIC_TRASLATE_API_KEY,
    },
    body: JSON.stringify({
      source: "en",
      target: "fa",
      text: text,
    }),
  });

  const result = await response.json();

  if (result.status !== 200) {
    return result
      .status(result.status)
      .json({ message: "Translation failed", detail: result });
  }

  return result.result;
}
