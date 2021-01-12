#
API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "review": {
      "restaurantId": "'"${REST_ID}"'",
      "favoriteDish": "'"${FAVORITEDISH}"'"
    }
  }'

echo
