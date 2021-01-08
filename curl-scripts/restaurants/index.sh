# restaurant index all

API="https://afternoon-wave-03144.herokuapp.com"
URL_PATH="/restaurants"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
