import fs from "fs";
import path from "path";

export const prettyPrint = (obj: any) => {
  console.log(JSON.stringify(obj, null, 2));
};

export const writeTxtFile = (filename: string, content: any) => {
  const stringContent =
    typeof content === "string" ? content : JSON.stringify(content, null, 2);

  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filename, stringContent);
};
