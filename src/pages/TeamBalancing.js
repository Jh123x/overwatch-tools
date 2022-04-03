import React from "react";
import { VariableForm } from "../components/VariableFormField";


export function TeamBalancingPage() {
    return (
        <div className='App'>
            <header className='App-header'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg'
                    className='App-logo'
                    alt='logo'
                />
                <h1>Team Balancing</h1>
                <div className='center-div'>
                    <p>Balance Teams based on current teammates</p>
                </div>
                <VariableForm />
            </header>
        </div>
    )
}