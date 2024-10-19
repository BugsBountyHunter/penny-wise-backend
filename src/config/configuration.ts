export interface Configuration {
  app: AppSettings;
}

export interface AppSettings {
  env: string;
  port: number;
}

export const configuration = (): Configuration => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
