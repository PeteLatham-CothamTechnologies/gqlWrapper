var axios = require('axios');
var data = JSON.stringify({
  query: `{
  getEntities {
    id
    title
		description
  }
}`,
  variables: {}
});

var config = {
  method: 'post',
  url: 'https://intelastel.io/graphql',
  headers: {
    'Application': 'z4yJrb2OWdWLDX7',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDBjZmNhZjk0ZDM1OTcyMDE2ODhiYTY4MTlmNjRjNTFjY2IzOTRmYjRiMzM1OWNkYmE4MjU0MTI2YjhiMzc0MmNjNDc1OWRkMzdlZjQ0NmQiLCJpYXQiOjE2MjgyNjA2NzMsIm5iZiI6MTYyODI2MDY3MywiZXhwIjoxNjI5NTU2NjczLCJzdWIiOiIyNjQiLCJzY29wZXMiOltdfQ.wlViZiwKqpNP_V0kHRMMEAokkU9GEOfJmAgDBrIc3Njgt6j6xQrVfQybXbB2roqhAkXU2jLcq-cSEs_jRQoIqaUbJdtNmCPx7f02nfRZOq7mSzi1MxU5egpJrIVGU860tCSex8q7d5LwAIU5MPKJYOV_bGE02k-IMNBLF9HfjHWdRGUW2Cm_lmwkMUdZdfnQmLF-1YPsdlRLC2wRp5J6MStoBMch6KUMefxx6_DowQh0tSK6v1LaQ_eFKNGE75Zd8nfcjK6ijf7czmJCeM3QZWjeZcftis1c8lUb3kX0UPuYS3IhKEpVp6HH25NNDM2ioG4zfk6DPHiXB3MKaQ-mu2fBPyuHif5dXOxD88yMO7YYBj-wb2AXHRqHiQc9KTf9q02csw1q-Bof5JQ4JhNmbvaSWH4IuCadJg9eIArpt7fxvGfL1LZS7YIU2YbOiycm284N0I1wVN8DlfYV55luaKnSQduY321XjMj-fkGPCdQOApkuBKoQGIXyHldzzCMz6jGBPbFLUpXN6UaeBchO32PwuFQI8718bSJLIYJ0yDh8JfLrEmZe74t4d6SUaMRZ8aWHhqpgf6GuIgKzvLCTvrZkKJKaOKh6dEbG5ZpB-hlfu_IEXOLRJPHJ9TnstYXCc6TZbAqjhGDRMWpaeR_ja1VozhBQbb38Vw-r-B8wpAM',
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});