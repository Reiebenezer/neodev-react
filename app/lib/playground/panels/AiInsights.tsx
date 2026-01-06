import { useContext, useEffect, useEffectEvent, useState } from "react";
import { PlaygroundContext } from "../context";
import { useStorage } from "~/lib/hooks";
import { PREVIEW_HTML } from "~/lib/constants";
import { Color } from "@reiebenezer/ts-utils/color";
import { GoogleGenAI } from "@google/genai";

const API = "http://127.0.0.1:5000/predict"
// const API = "https://neodev-graphsage-u1ya.onrender.com/from-html";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC-A2cPAz0sooftJa27_Wq-WlXO6t17wPg" });

export default function AiInsights() {
  const [html] = useStorage(PREVIEW_HTML)
  const [data, setData] = useState<{ predicted_label: string, confidence: number }[]>([]);
  const [message, setMessage] = useState("");
  const [allowNextTip, setAllowNextTip] = useState(true);

  const syncedAllowNextTip = useEffectEvent(() => allowNextTip);
  const getDataSnapshot = useEffectEvent(() => data);

  useEffect(() => {
    if (!html) return;

    fetch(API, {
      method: 'post',
      body: JSON.stringify({
        html: html
          .replaceAll("\n", "")
          .replaceAll("\t", "")
          .replaceAll(/\>([\s\S]*?)\</g, '>\n\t$1\n<')
          .replaceAll(/rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g, (str, r, g, b) => {
            return Color({ r: parseInt(r), g: parseInt(g), b: parseInt(b) }).hex().toLowerCase();
          })
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
      .then(async data => {
        console.log(data);
        setData([data]);

        if (syncedAllowNextTip() && data.predicted_label !== getDataSnapshot()[0].predicted_label) {
          console.log('updating response...')
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
            CONTEXT: You are a model that gives "Did You Know?" tips to students who are trying to learn web development.
            INPUT: a UI component
            OUTPUT: A brief, but detailed "Did You Know?" message about this specific UI component.

            When responding, you must follow this format: 
            A <component name> is <description>, composed primarily of <elements>. It is mainly used in <application>. <Additional tips>. Limit your response to a maximum of 35 words.

            The UI component you should discuss is: ${data.predicted_label}
          `,
          });

          setMessage(response.text ?? "");
          setAllowNextTip(false);

          setTimeout(() => setAllowNextTip(true), 30_000);
          console.log(response.text);
        }

      })

  }, [html]);

  return (
    <div className="max-w-xl bg-accent flex gap-6 p-2 rounded-md">
      <div className="flex gap-2 items-start">
        <span className="text-lg">💡</span>
        <h3 className="text-nowrap text-sm font-bold">Did You Know?</h3>
      </div>
      <p className="text-xs">{message}</p>

      <div className="text-sm text-gray-600">

      </div>
    </div>
  );
}