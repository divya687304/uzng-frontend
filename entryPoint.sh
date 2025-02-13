
#!/bin/sh
JSON_STRING='window.configs = { \
  "VITE_AUTH0_DOMAIN":"'"${VITE_AUTH0_DOMAIN}"'", \
  "VITE_AUTH0_CLIENT_ID":"'"${VITE_AUTH0_CLIENT_ID}"'" \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /mnt/uanalyze-ng/deploy/index.html
exec "$@"

