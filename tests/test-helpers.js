function getPlainResponse(response) {
  response ? (response = response.get({ plain: true })) : '';
  console.log(response);
  return response;
}

export { getPlainResponse };
