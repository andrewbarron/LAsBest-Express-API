API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/reviews/${REVIEW_ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "review": {
      "restaurantId": "'"${REST_ID}"'",
      "description": "'"${DESCRIPTION}"'",
      "favoriteDish": "'"${FAVORITEDISH}"'",
      "price": "'"${PRICE}"'",
      "value": "'"${VALUE}"'"
    }
  }'

echo
