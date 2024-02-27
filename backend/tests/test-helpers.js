function getPlainResponse(response) {
  response ? (response = response.get({ plain: true })) : '';
  return response;
}

export { getPlainResponse };
