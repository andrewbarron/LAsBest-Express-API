API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/reviews/${REVIEW_ID}"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --data '{
    "review": {
      "restaurantId": "'"${REST_ID}"'"
    }
  }'

echo
