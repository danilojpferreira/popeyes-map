FROM mongo
COPY base.json /base.json
CMD mongoimport --host popeyes_mongo --db popeyes --collection maps --drop --file ./base.json