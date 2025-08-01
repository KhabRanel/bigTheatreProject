const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./img";
const outputDir = "./dist/img";

// Создаём папку назначения, если её нет
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Список файлов из inputDir
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Ошибка чтения директории:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      const inputPath = path.join(inputDir, file);
      const outputFileName = path.basename(file, ext) + ".webp";
      const outputPath = path.join(outputDir, outputFileName);

      sharp(inputPath)
        .toFormat("webp")
        .toFile(outputPath)
        .then(() => console.log(`Конвертировано: ${file} → ${outputFileName}`))
        .catch((err) => console.error("Ошибка конвертации:", err));
    }
  });
});
