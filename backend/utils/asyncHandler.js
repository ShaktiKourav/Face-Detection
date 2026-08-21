/* ==========================================================
   ASYNC HANDLER
========================================================== */

const asyncHandler = (fn) => {

  return async (req, res, next) => {

    Promise.resolve(
      fn(req, res, next)
    ).catch(next);

  };

};

export default asyncHandler;