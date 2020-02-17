const CreateSuccessResult = (code, result) => {
  return {
    status: code,
    success: true,
    result,
  };
};

const CreateErrorResult = (code, errors) => {
  return {
    status: code,
    success: false,
    errors,
  };
};

module.exports = { CreateSuccessResult, CreateErrorResult };
