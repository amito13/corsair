class Logger {
  info(message: string, data?: unknown) {
    console.log(
      `ℹ️ [INFO] ${message}`,
      data ?? ""
    );
  }

  success(message: string, data?: unknown) {
    console.log(
      `✅ [SUCCESS] ${message}`,
      data ?? ""
    );
  }

  warn(message: string, data?: unknown) {
    console.warn(
      `⚠️ [WARN] ${message}`,
      data ?? ""
    );
  }

  error(message: string, error?: unknown) {
    console.error(
      `❌ [ERROR] ${message}`,
      error ?? ""
    );
  }
}

export const logger = new Logger();