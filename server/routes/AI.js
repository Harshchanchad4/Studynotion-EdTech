const express = require("express");
const router = express.Router();
const {
  chatHandler,
  indexHandler,
  reindexHandler,
  healthHandler,
} = require("../controllers/AI");

router.post("/chat", chatHandler);
router.post("/index", indexHandler);
router.post("/reindex", reindexHandler);
router.get("/health", healthHandler);

module.exports = router;
