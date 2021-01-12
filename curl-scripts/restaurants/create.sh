API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "restaurant": {
      "name": "'"${NAME}"'",
      "cuisine": "'"${CUISINE}"'",
      "location": "'"${LOCATION}"'"
    }
  }'

echo
