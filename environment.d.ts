declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string
      PORT: string
      MONGO_URI: string
      OPENAI_API_KEY: string
      OPENAI_ORGANIZATION: string
      MJ_API_KEY: string
      STORAGE_BUCKET: string
      // Add other environment variables as needed
    }
  }
}

export {}