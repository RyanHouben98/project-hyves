export function getEnvironmentVariable(variableName: string): string {
  const value = process.env[variableName];

  if (!value) {
    throw new Error(
      `${variableName} is not defined. Please set the environment variable.`
    );
  }

  return value;
}
