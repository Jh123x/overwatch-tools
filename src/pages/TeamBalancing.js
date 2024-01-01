import React from "react";
import { VariableForm } from "../components/VariableFormField";
import style from "./app.module.css";

export function TeamBalancingPage() {
  return (
    <div className={style.App}>
      <div className={style.header}>
        <h1>Team Balancing</h1>
        <div className="center-div">
          <p>Balance Teams based on current teammates</p>
        </div>
        <VariableForm />
      </div>
    </div>
  );
}
