export const successResponse = (res, payload = {}, statusCode = 200) => {
  const { message = 'Success', data = {}, ...rest } = payload;

  return res.status(statusCode).json({
    success: true,
    message,
    ...rest,
    data,
  });
};

export const errorResponse = (
  res,
  { message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR', details } = {},
  statusCode = 500,
) => {
  const body = {
    success: false,
    message,
    error: {
      code,
    },
  };

  if (details !== undefined) {
    body.error.details = details;
  }

  return res.status(statusCode).json(body);
};
