import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getCurrentDirectoryPath = () => {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
};
