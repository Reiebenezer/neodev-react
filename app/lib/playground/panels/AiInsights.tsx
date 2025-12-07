import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../context";
import { useStorage } from "~/lib/hooks";
import { PREVIEW_HTML } from "~/lib/constants";
import { Color } from "@reiebenezer/ts-utils/color";

// const API = "http://127.0.0.1:8000/from-html"
const API = "https://neodev-graphsage-u1ya.onrender.com/from-html"

export default function AiInsights() {
  const [html] = useStorage(PREVIEW_HTML)
  const [data, setData] = useState<{ label: string, confidence: number }[]>([]);

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
      .then(data => {
        console.log(data);
        setData(data.results);        
      })

  }, [html]);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-8">AI Insights</h1>
      <h2 className="text-2xl font-bold">Based on the selected frame, our AI thinks you might be building:</h2>
      <div className="mt-8 flex flex-col gap-4">
        {data[0] && <h2 className="text-2xl font-bold">{data[0].label} (Probability: {(data[0].confidence * 100).toFixed(2)}%)</h2>}
        {data[1] && <h3 className="text-lg font-bold">{data[1].label} (Probability: {(data[1].confidence * 100).toFixed(2)}%)</h3>}
        {data[2] && <p className="font-bold">{data[2].label} (Probability: {(data[2].confidence * 100).toFixed(2)}%)</p>}
      </div>
    </div>
  );
}