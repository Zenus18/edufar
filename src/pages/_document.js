import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head />
      <body>
        <Main />
        <NextScript />
        <style>
          {`::-webkit-scrollbar {
  display: none;
}`}
        </style>
      </body>
    </Html>
  );
}
