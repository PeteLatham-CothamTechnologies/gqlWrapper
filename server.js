const express = require('express');
const axios = require('axios');

const wrapperServer = express();
let parser = require('body-parser');

wrapperServer.use(parser.json());

wrapperServer.get('/entities', async (req, res) => {
  async function getResponseStructure() {
    let responseStructure = {};

    req.body.entities.forEach(async (entityName) => {
      function matchItemName(item) {
        return item.title === entityName;
      }

      function matchAttributesAndValues(attributes, values) {
        let returnStructure = [];

        values.data.forEach((valuesSet) => {
          let record = {};

          valuesSet.attributes.forEach((value) => {
            let attr = attributes.filter((attribute) => attribute.id === value.id);
            attrName = attr[0].name;

            record[`${attrName}`] = value.value;
          });

          returnStructure.push(record);
        });

        return returnStructure;
      }

      let data = JSON.stringify({
        query: `{
        getEntities {
          id
          title
        }
      }`,
        variables: {},
      });

      const config = {
        method: 'post',
        url: 'https://intelastel.io/graphql',
        headers: {
          Application: req.headers.application,
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios(config);
      const entityID = response.data.data.getEntities.filter(matchItemName)[0].id;

      responseStructure[entityName] = {};
      responseStructure[entityName].id = entityID;

      attributeData = JSON.stringify({
        query: `{
        Api {
          getAttributes(entityId: "${entityID}") {
            attributes {
              description
              id
              label
              name
              required
              type
            }
          }
        }
      }`,
      });

      const attributeConfig = {
        method: 'post',
        url: 'https://intelastel.io/graphql',
        headers: {
          Application: req.headers.application,
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
        data: attributeData,
      };

      const attributesResponse = await axios(attributeConfig);
      const attributes = attributesResponse.data.data.Api.getAttributes.attributes;

      const getEntityValuesQuery = JSON.stringify({
        query: `{
          Api {
            getEntityValues(entityId: "${entityID}") {
              count
              data {
                attributes {
                  id
                  value
                }
              }
            }
          }
        }`,
      });

      let getEntityValuesConfig = {
        method: 'post',
        url: 'https://intelastel.io/graphql',
        headers: {
          Application: req.headers.application,
          Authorization: req.headers.authorization,
          'Content-Type': 'application/json',
        },
        data: getEntityValuesQuery,
      };

      const valuesResponse = await axios(getEntityValuesConfig);
      const values = valuesResponse.data.data.Api.getEntityValues;
      responseStructure[entityName].count = values.count;
      responseStructure[entityName].data = [];

      responseStructure[entityName].data = matchAttributesAndValues(attributes, values);
      console.log(
        '🚀 ~ file: server.js ~ line 128 ~ req.body.entities.forEach ~ responseStructure',
        JSON.stringify(responseStructure),
      );
    });

    return responseStructure;
  }

  const result = await getResponseStructure();

  res.json(result);
});

const port = 4001;
wrapperServer.listen(process.env.PORT || port, () => {
  console.log(`Thank you. wrapperServer is listening at port ${process.env.PORT || port}`);
});
