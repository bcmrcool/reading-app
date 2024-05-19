import OpenAI from "openai"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
const port = process.env.PORT || 3001

app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
})

app.post("/simplify-text", async (req, res) => {
  const { text, version } = req.body
  try {
    let responseText
    if (version === "simplified") {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "user", content: `Simplify this text: ${text}` }],
        temperature: 0.7,
        max_tokens: 100,
      })

      responseText = response.choices[0].message
    } else {
      responseText = text
    }
    res.json({ text: responseText })
  } catch (error) {
    console.error("Failed to fetch or simplify text:", error)
    res.status(500).json({ message: "Failed to process text", error })
  }
})

app.post("/chat-with-character", async (req, res) => {
  const { character, message, context } = req.body

  try {
    const prompt = `You are ${character}, a character from the story. The last thing you know is: ${context}. You will respond to all questions as if you are the character in the given context.`
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
      temperature: 0.9,
      max_tokens: 150,
    })

    console.log(response)
    const reply = response.choices[0].message
    res.json({ message: reply })
  } catch (error) {
    console.error("Failed to chat with character:", error)
    res.status(500).json({ message: "Failed to process chat message", error })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

/**
 * This is a reading application where for you can read stories, and have the option as you're reading to (1) simplify or make more original the next section, so for example, let's say I'm reading Metamorphosis, when I switch to the next page I have the option of seeing a more summarized version or going back to a version more like the original. So let's say I'm about to go to the second page, I can (1) see the original content from the book, OR I'll have an option to see a simplified version, then when I turn the page again I can also see an even more simplified version or maybe I can choose to go back up to be closer to the original. That's functionality #1, the second functionality is that I'd like to be able once per chapter to be able to click into a character and a chat window would open up where I'm speaking directly to that character where that character has only experienced events up to that point in the book. 

I want to do this in react


so for example, I know your'e familiar with Pride and Prejudice but let's say you wern't and I wanted to have a summary of each chapter somewhere in an rds server so like basically I'd have the entire book (each page) but more importantly I'd want you to summarize each chapter, how could I do this asyncrouhnsly? in other words like if I wanted to basically upload the entire book and asyncounhsly have you summarize each chapter
 */
