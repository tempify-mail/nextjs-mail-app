import fs from 'fs/promises';
import path from 'path';

export const renderEmail = async (templateName: string, data: Record<string, string>) => {
  const filePath = path.join(process.cwd(), 'src', 'emails', `${templateName}.html`);
  let html = await fs.readFile(filePath, 'utf8');

  for (const key in data) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, data[key]);
  }

  return html;
};
