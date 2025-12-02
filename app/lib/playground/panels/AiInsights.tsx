import { useContext, useEffect } from "react";
import { PlaygroundContext } from "../context";
import { useStorage } from "~/lib/hooks";
import { PREVIEW_HTML } from "~/lib/constants";

const API = "http://127.0.0.1:5000/predict"

export default function AiInsights() {
  const [html] = useStorage(PREVIEW_HTML)

  useEffect(() => {
    if (!html) return;

    fetch(API, {
      method: 'post',
      body: JSON.stringify({ html: html.replaceAll("\n", "") }),
      headers: {
        "Content-Type": "application/json"
      }
      
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      })

  }, [html]);

  return (
    <>

    </>
  );
}