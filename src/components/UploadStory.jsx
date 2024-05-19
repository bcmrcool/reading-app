import React, { useState } from "react"
import axios from "axios"

const UploadStory = () => {
  const [storyId, setStoryId] = useState("")
  const [storyText, setStoryText] = useState("")
  const [message, setMessage] = useState("")

  const handleUpload = async () => {
    try {
      const response = await axios.post("http://localhost:3001/upload-story", {
        storyId,
        storyText,
      })
      setMessage(response.data.message)
    } catch (error) {
      console.error("Failed to upload story:", error)
      setMessage("Failed to upload story")
    }
  }

  return (
    <div>
      <h2>Upload Story</h2>
      <input
        type="text"
        placeholder="Story ID"
        value={storyId}
        onChange={(e) => setStoryId(e.target.value)}
      />
      <textarea
        placeholder="Story Text"
        value={storyText}
        onChange={(e) => setStoryText(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default UploadStory
