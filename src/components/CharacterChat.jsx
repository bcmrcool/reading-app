import React, { useState } from "react"
import { chatWithCharacter } from "../api"

export const CharacterChat = ({ currentText }) => {
  const [character, setCharacter] = useState("Spider Man")
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  const handleSendMessage = async () => {
    try {
      const response = await chatWithCharacter(character, message, currentText)
      setChatHistory([...chatHistory, { message, reply: response.message }])
      setMessage("") // Clear input after sending
    } catch (error) {
      console.error("Error chatting with character:", error)
    }
  }
  console.log(chatHistory)
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        {chatHistory.map((entry, index) => (
          <p key={index}>
            <b>You:</b> {entry.message} <b>Reply:</b> {entry.reply?.content}
          </p>
        ))}
      </div>
    </div>
  )
}
