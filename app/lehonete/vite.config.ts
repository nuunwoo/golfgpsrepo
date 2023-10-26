import { createLogger, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const logger = createLogger();
const loggerWarn = logger.warn;

logger.warn = (msg, options) => {
  // 빈 CSS 파일에 대한 경고 무시
  if (msg.includes("vite:css") && msg.includes(" is empty")) return;
  loggerWarn(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig({
  customLogger: logger,
  plugins: [react()],
  server: {
    port: 5050,
  },
  publicDir: "./public",
  cacheDir: "../../.yarn/.vite",

  build: {
    outDir: path.join(
      "../../build/",
      String(__dirname.split("/").at(-1)),
      "dist"
    ),
  },
});
