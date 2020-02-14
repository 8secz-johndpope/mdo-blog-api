const CreateSuccessResult = (code, result) => {
  return {
    status: code,
    success: true,
    data: result,
  };
};

const CreateErrorResult = (code, errors) => {
  return {
    status: code,
    success: false,
    errors: errors,
  };
};

module.exports = { CreateSuccessResult, CreateErrorResult };
