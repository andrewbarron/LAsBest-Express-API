# update restaurant
API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/restaurants/${ID}"

curl "${API}${URL_PATH}" \
--include \
--request PATCH \
--header "Content-Type: application/json" \
--data '{
  "restaurant": {
    "name": "'"${NAME}"'",
    "cuisine": "'"${CUISINE}"'",
    "location": "'"${LOCATION}"'",
    "price": "'"${PRICE}"'"
  }
}'
