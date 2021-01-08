# delete restaurant
API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/restaurants/${ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"
