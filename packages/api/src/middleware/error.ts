export function errorResponse(message: string, code: string, status: number) {
  return {
    error: {
      message,
      code,
      status,
    },
  };
}
