import React, { useState, useEffect } from "react"
import { simplifyText } from "../api"

export const TextDisplay = ({ initialText, onTextChange }) => {
  const [displayedText, setDisplayedText] = useState(initialText)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    onTextChange(displayedText) // Call the callback whenever displayedText changes
  }, [displayedText, onTextChange])

  const handleTextChange = async (version) => {
    if (version === "simplified") {
      setLoading(true)
      try {
        const { text } = await simplifyText(displayedText, version)
        setDisplayedText(text?.content)
      } catch (error) {
        console.log("Error fetching text:", error)
        setDisplayedText("Failed to load text")
      } finally {
        setLoading(false)
      }
    } else if (version === "original") {
      setDisplayedText(initialText)
    }
  }

  return (
    <div>
      {loading ? <p>Loading...</p> : <div>{displayedText}</div>}
      <button onClick={() => handleTextChange("original")}>Original</button>
      <button onClick={() => handleTextChange("simplified")}>Simplified</button>
    </div>
  )
}
