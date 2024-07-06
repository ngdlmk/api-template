declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string;
      PORT: string;
      // Add other environment variables as needed
    }
  }
}

export {};
