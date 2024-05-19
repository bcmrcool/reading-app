import React, { useState } from "react"
import { ChapterNavigator } from "./components/ChapterNavigator"
import { TextDisplay } from "./components/TextDisplay"
import { CharacterChat } from "./components/CharacterChat"
import logo from "./logo.svg"
import "./App.css"

const spideyText =
  "Spidey crouches on top of a billboard near the Cloisters on the West Side of Manhattan. He's been scoping out the scene for several nights in a row, hoping to find any kind of sign of whatever old rich person is hiding this alien artifact. Unfortunately, that afternoon's fight still has him feeling off. MJ had replied to his text with a thumbs-up and a message that said I'm sorry for being a jerk, let's talk later? He'd immediately responded with Yes! but he hadn't otherwise heard from her all day. "

function App() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [currentText, setCurrentText] = useState(spideyText)

  const handleTextChange = (newText) => {
    setCurrentText(newText)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the reading app</h1>
      </header>
      <TextDisplay initialText={currentText} onTextChange={handleTextChange} />
      <ChapterNavigator />
      <CharacterChat currentText={currentText} />
    </div>
  )
}

export default App
