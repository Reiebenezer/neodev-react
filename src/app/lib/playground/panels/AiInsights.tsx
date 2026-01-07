import { useContext, useEffect, useEffectEvent, useState } from "react";
import { PlaygroundContext } from "../context";
import { useStorage } from "~/lib/hooks";
import { PREVIEW_HTML } from "~/lib/constants";
import { Color } from "@reiebenezer/ts-utils/color";

const API = "http://127.0.0.1:5000/predict"
// const API = "https://neodev-graphsage-u1ya.onrender.com/from-html";

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
        // console.log(data);
        setData([data]);

        if (syncedAllowNextTip() && data.predicted_label !== getDataSnapshot()[0].predicted_label) {
          console.log('updating response...')
          const response = await fetch('/api/generate-insights', { method: 'POST', body: JSON.stringify({ predicted_label: data.predicted_label })})
          setMessage(await response.text() ?? "");

          setAllowNextTip(false);
          setTimeout(() => setAllowNextTip(true), 30_000);
          // console.log(response.text);
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