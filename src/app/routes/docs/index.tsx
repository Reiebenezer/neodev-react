import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";

export default function Index() {
  const nav = useNavigate();

  useLayoutEffect(() => { nav("/docs/welcome") }, []);

  return null;
}