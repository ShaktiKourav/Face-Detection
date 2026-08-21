/* ==========================================================
   SUCCESS RESPONSE
========================================================== */

export const successResponse = (
  res,
  message = "Success",
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    status: "success",
    message,
    data,
  });
};

/* ==========================================================
   ERROR RESPONSE
========================================================== */

export const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    status: "error",
    message,
    errors,
  });
};

/* ==========================================================
   PAGINATION RESPONSE
========================================================== */

export const paginatedResponse = (
  res,
  message,
  data,
  pagination,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    status: "success",
    message,
    data,
    pagination,
  });
};

/* ==========================================================
   CREATED RESPONSE
========================================================== */

export const createdResponse = (
  res,
  message,
  data = null
) => {
  return res.status(201).json({
    success: true,
    status: "success",
    message,
    data,
  });
};

/* ==========================================================
   NO CONTENT RESPONSE
========================================================== */

export const noContentResponse = (res) => {
  return res.status(204).send();
};

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
  createdResponse,
  noContentResponse,
};

