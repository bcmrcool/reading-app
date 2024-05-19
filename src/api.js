import axios from "axios"

const baseURL = "http://localhost:3001"

export const simplifyText = async (text, version) => {
  try {
    const response = await axios.post(`${baseURL}/simplify-text`, {
      text,
      version,
    })
    return response.data
  } catch (error) {
    console.error("Failed to simplify text:", error)
    throw error
  }
}

export const chatWithCharacter = async (character, message, currentText) => {
  const response = await axios.post(`${baseURL}/chat-with-character`, {
    character,
    message,
    context: currentText,
  })
  return response.data
}
/**
 * scp -i "C:\Users\james\Downloads\reading-application-server.pem" -r reading-app ec2-user@18.144.49.28:/home/ec2-user/
ssh -i reading-application-server.pem ec2-user@18.144.49.28
 */
