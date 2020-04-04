module.exports = {
  transformAxiosRejectionToException: (error) => {
    if (error.isAxiosError) {
      throw new Error(error.response.data.message);
    }
  }
};