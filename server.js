const express = require('express');
const axios = require('axios');

const wrapperServer = express();
wrapperServer.use(express.urlencoded({ extended: true }));
wrapperServer.use(express.json());

// let parser = require('body-parser');
// wrapperServer.use(parser.json());

let queryData = JSON.stringify({
  query: `{
  getEntities {
    id
    title
  }
}`,
  variables: {},
});

function matchItemName(item) {
  return item.title === entityName;
}

function matchAttributesAndValues(attributes, values) {
  let returnStructure = [];

  values.data.forEach((valuesSet) => {
    let record = {};

    valuesSet.attributes.forEach((value) => {
      console.log('🚀 ~ file: server.js ~ line 31 ~ valuesSet.attributes.forEach ~ value', value);
      let attr = attributes.filter((attribute) => attribute.id === value.id);
      attrName = attr[0].name;

      record[`${attrName}`] = value.value;
    });

    returnStructure.push(record);
  });

  return returnStructure;
}

wrapperServer.get('/entities', (req, res) => {
  const config = {
    method: 'post',
    url: 'https://intelastel.io/graphql',
    headers: {
      Application: req.headers.application,
      Authorization: req.headers.authorization,
      'Content-Type': 'application/json',
    },
    data: queryData,
  };

  async function getResponseStructure() {
    let responseStructure = {
      default: 'Here we go ...',
    };

    req.body.entities.forEach(async (entityName) => {
      console.log('🚀 ~ file: server.js ~ line 18 ~ req.body.entities.forEach ~ entityName', entityName);

      try {
        const response = await axios(config);
        // console.log('response');
        // console.log(response);
        const entityID = response.data.data.getEntities.filter(matchItemName(entityName))[0].id;
        console.log('🚀 ~ file: server.js ~ line 68 ~ getResponseStructure ~ entityID', entityID);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
    return { entityID };
  }

  getResponseStructure()
    .then((data) => {
      console.log('🚀 ~ file: server.js ~ line 75 ~ .then ~ data', data);

      res.send(data);
    })
    .catch((error) => res.status(500).send(error))
    .finally(() => console.log('All done'));
});

const port = 4001;
wrapperServer.listen(process.env.PORT || port, () => {
  console.log(`Thank you. wrapperServer is listening at port ${process.env.PORT || port}`);
});
