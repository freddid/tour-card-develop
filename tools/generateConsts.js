const fs = require('fs');
const path = require('path');

/**
 * Генерирует TypeScript-модуль с константами для указанного окружения
 * @param {string} sourcePath - Путь к JSON с данными
 * @param {string} env - Окружение (например, "Test", "Release", "Debug")
 * @param {string} outputPath - Папка, куда будет сохранён файл
 * @returns {string} Абсолютный путь к сгенерированной директории
 */
function generateConstsToFolder(sourcePath, env, outputPath) {
   const absSourcePath = path.resolve(sourcePath);
   const absOutputPath = path.resolve(outputPath);
   const outputFile = path.join(absOutputPath, 'index.ts');

   if (!fs.existsSync(absSourcePath)) {
      throw new Error(`Файл ${absSourcePath} не найден`);
   }

   const raw = JSON.parse(fs.readFileSync(absSourcePath, 'utf8'));
   const lines = [];

   for (const [key, value] of Object.entries(raw)) {
      if (typeof value === 'object' && value[env] !== undefined) {
         lines.push(`export const ${key} = ${JSON.stringify(value[env])};`);
      }
   }

   fs.mkdirSync(absOutputPath, { recursive: true });
   fs.writeFileSync(outputFile, lines.join('\n'), 'utf8');

   return absOutputPath;
}

module.exports = {
   generateConstsToFolder
};
