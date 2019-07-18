#!/usr/bin/env bash

set -e

function usage {
    echo "Upload a site log xml file to the database."
    echo "Usage: $(basename "${0}") <env> <xmlFile>"
    echo "Where <env> is the environment, eg., local, dev, or test"
    echo "      <xmlFile> is the path of the input xml file"
}

if [[ $# != 2 ]]; then
    usage
    exit 1
fi

env=$1
xmlFile=$2

if [[ "$env" == "local" ]]; then
    gws=http://localhost:8081
    openam=http://localhost:8083/openam
elif [[ "$env" == "dev" ]]; then
    gws=https://dev.geodesy.ga.gov.au
    openam=https://devgeodesy-openam.geodesy.ga.gov.au/openam
elif [[ "$env" == "test" ]]; then
    gws=https://test.geodesy.ga.gov.au
    openam=https://testgeodesy-openam.geodesy.ga.gov.au/openam
else
    echo "Unsupported environment: $env"
    usage
fi

clientId=GnssSiteManager
clientPassword=gumby123

username=user.x
password=gumby123X

jwt=$(curl -s --user ${clientId}:${clientPassword} --data \
    "grant_type=password&username=${username}&password=${password}&scope=openid profile" \
    ${openam}/oauth2/access_token?realm=/ | jq .id_token | tr -d '"')

curl --data-binary @${xmlFile} ${gws}/siteLogs/upload \
    -H "Authorization: Bearer ${jwt}"
