const express = require("express");
const router = express.Router();
const { v1: uuidv1 } = require("uuid");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const { BlobServiceClient } = require("@azure/storage-blob");
const config = require("config");
const storageConnectionString = config.get("storageConnectionString");
const containerName = "demoapp";
const blobServiceClient = BlobServiceClient.fromConnectionString(
  storageConnectionString
);
const containerClient = blobServiceClient.getContainerClient(containerName);

const CosmosClient = require("@azure/cosmos").CosmosClient;
const client = new CosmosClient(config.get("cosmosConnectionString"));
const database = client.database("demoappdb");
const container = database.container("event");

router.post("/", multipartMiddleware, async (req, res) => {
  try {
    let _eventLogo = [];
    let _sponsorLogo = [];
    let _loadingScreenBackground = [];
    const { eventLogo, sponsorLogo, loadingScreenBackground } = req.files;
    let _payload = JSON.parse(req.body.payload);
    _payload.id = uuidv1();
    if (eventLogo) {
      if (Array.isArray(eventLogo)) {
        eventLogo.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _eventLogo.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(eventLogo);
        _eventLogo.push(url);
      }
    }

    if (sponsorLogo) {
      if (Array.isArray(sponsorLogo)) {
        sponsorLogo.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _sponsorLogo.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(sponsorLogo);
        _sponsorLogo.push(url);
      }
    }

    if (loadingScreenBackground) {
      if (Array.isArray(loadingScreenBackground)) {
        loadingScreenBackground.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _loadingScreenBackground.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(loadingScreenBackground);
        _loadingScreenBackground.push(url);
      }
    }
    for (let index = 0; index < _payload.performances.length; index++) {
      const performance = _payload.performances[index].performance;
      let video = req.files[`performances_${index}_video`];
      let audio = req.files[`performances_${index}_audio`];
      let performanceThumbnailImage =
        req.files[`performances_${index}_performanceThumbnailImage`];

      if (performanceThumbnailImage) {
        performance.performanceThumbnailImage = [];
        if (Array.isArray(performanceThumbnailImage)) {
          performanceThumbnailImage.forEach(async (e) => {
            console.log(element);
            let url = await uploadToAzureStorage(e);
            performance.performanceThumbnailImage.push(url);
            //_loadingScreenBackground
          });
        } else {
          let url = await uploadToAzureStorage(performanceThumbnailImage);
          performance.performanceThumbnailImage.push(url);
        }
      }

      if (video) {
        performance.video = [];
        if (Array.isArray(video)) {
          video.forEach(async (e) => {
            let url = await uploadToAzureStorage(e);
            performance.video.push(url);
          });
        } else {
          let url = await uploadToAzureStorage(video);
          performance.video.push(url);
        }
      }

      if (audio) {
        performance.audio = [];
        if (Array.isArray(audio)) {
          audio.forEach(async (e) => {
            let url = await uploadToAzureStorage(e);
            performance.audio.push(url);
          });
        } else {
          let url = await uploadToAzureStorage(audio);
          performance.audio.push(url);
        }
      }
    }
    _payload.sponsorLogo = _sponsorLogo;
    _payload.eventLogo = _eventLogo;
    _payload.loadingScreenBackground = _loadingScreenBackground;
    const { resource: createdItem } = await container.items.create(_payload);
    return res.send(createdItem);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete(
  "/DocumentId/:DocumentId/PartitionKey/:PartitionKey",
  async (req, res) => {
    try {
      const { resource: result } = await container
        .item(req.params.DocumentId, req.params.PartitionKey)
        .delete();
      return res.send("true");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.put("/", multipartMiddleware, async (req, res) => {
  try {
    let _eventLogo = [];
    let _sponsorLogo = [];
    let _loadingScreenBackground = [];
    const { eventLogo, sponsorLogo, loadingScreenBackground } = req.files;
    let _payload = JSON.parse(req.body.payload);
    if (eventLogo) {
      if (Array.isArray(eventLogo)) {
        eventLogo.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _eventLogo.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(eventLogo);
        _eventLogo.push(url);
      }
    }

    if (sponsorLogo) {
      if (Array.isArray(sponsorLogo)) {
        sponsorLogo.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _sponsorLogo.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(sponsorLogo);
        _sponsorLogo.push(url);
      }
    }

    if (loadingScreenBackground) {
      if (Array.isArray(loadingScreenBackground)) {
        loadingScreenBackground.forEach(async (e) => {
          let url = await uploadToAzureStorage(e);
          _loadingScreenBackground.push(url);
        });
      } else {
        let url = await uploadToAzureStorage(loadingScreenBackground);
        _loadingScreenBackground.push(url);
      }
    }
    for (let index = 0; index < _payload.performances.length; index++) {
      const performance = _payload.performances[index].performance;
      let video = req.files[`performances_${index}_video`];
      let audio = req.files[`performances_${index}_audio`];
      let performanceThumbnailImage =
        req.files[`performances_${index}_performanceThumbnailImage`];

      if (performanceThumbnailImage) {
        performance.performanceThumbnailImage = [];
        if (Array.isArray(performanceThumbnailImage)) {
          performanceThumbnailImage.forEach(async (e) => {
            console.log(element);
            let url = await uploadToAzureStorage(e);
            performance.performanceThumbnailImage.push(url);
            //_loadingScreenBackground
          });
        } else {
          let url = await uploadToAzureStorage(performanceThumbnailImage);
          performance.performanceThumbnailImage.push(url);
        }
      }

      if (video) {
        performance.video = [];
        if (Array.isArray(video)) {
          video.forEach(async (e) => {
            let url = await uploadToAzureStorage(e);
            performance.video.push(url);
          });
        } else {
          let url = await uploadToAzureStorage(video);
          performance.video.push(url);
        }
      }

      if (audio) {
        performance.audio = [];
        if (Array.isArray(audio)) {
          audio.forEach(async (e) => {
            let url = await uploadToAzureStorage(e);
            performance.audio.push(url);
          });
        } else {
          let url = await uploadToAzureStorage(audio);
          performance.audio.push(url);
        }
      }
    }
    _payload.sponsorLogo = _sponsorLogo;
    _payload.eventLogo = _eventLogo;
    _payload.loadingScreenBackground = _loadingScreenBackground;
    const { resource: updatedItem } = await container.items.container
      .item(_payload.id, _payload.eventCode)
      .replace(_payload);
    return res.send(updatedItem);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/DocumentId/:DocumentId", async (req, res) => {
  try {
    const { resources } = await container.items
      .query({
        query: "SELECT * from c WHERE c.id = @id",
        parameters: [{ name: "@id", value: req.params.DocumentId }],
      })
      .fetchAll();
    return res.send(resources);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

async function uploadToAzureStorage(file) {
  const blobName = uuidv1() + file.name;
  const contentType = file.type;
  const filePath = file.path; //This is where you get the file path.
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
  return blockBlobClient.url;
}

module.exports = router;
