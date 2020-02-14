const CreateSuccessData = (code, result) => {
  return {
    status: code,
    success: true,
    data: result,
  };
};

const CreateErrorData = (code, errors) => {
  return {
    status: code,
    success: false,
    errors,
  };
};

module.exports = { CreateSuccessData, CreateErrorData };
