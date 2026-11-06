
export function getEnv(key: string): string {
  const value = process.env[key];

  if (value === undefined || value.trim() === '') {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}
