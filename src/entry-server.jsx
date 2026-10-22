// Předrenderování: při buildu z toho vznikne hotové HTML pro každý jazyk,
// takže obsah vidí vyhledávače i AI roboti, kteří nespouštějí JavaScript.
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import i18n from "./i18n";

export async function render(lang) {
  await i18n.changeLanguage(lang);
  return renderToString(<App />);
}
