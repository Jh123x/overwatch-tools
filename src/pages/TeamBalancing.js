import React from "react";
import { VariableForm } from "../components/VariableFormField";
import { mainLogo } from "../components/MainLogo";

export function TeamBalancingPage() {
  return (
    <div className="App">
      <div className="App-header">
        {mainLogo}
        <h1>Team Balancing</h1>
        <div className="center-div">
          <p>Balance Teams based on current teammates</p>
        </div>
        <VariableForm />
      </div>
    </div>
  );
}
