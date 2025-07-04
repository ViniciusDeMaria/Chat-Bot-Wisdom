declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    URL_TOKEN: string;
    URL_TOKEN_STAGE: string;
    URL_MESSAGE: string;
    URL_MESSAGE_STAGE: string;
    USER: string;
    PASSWORD: string;
    CROSS_ORIGIN: string;
  }
}