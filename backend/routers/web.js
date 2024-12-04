import express from 'express';
import homepageController from '../controllers/homepageController.js';
const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", homepageController.getHomepage);
    app.use("/", router);
};

export default initWebRouter;