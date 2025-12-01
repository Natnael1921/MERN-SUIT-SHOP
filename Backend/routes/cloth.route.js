import express from "express";
import { addCloths, deleteCloths, getCloths,updateCloth,getClothStats } from "../controllers/cloth.controller.js";

const router=express.Router();
router.get("/stats", getClothStats);

router.post("/",addCloths);
router.get("/",getCloths);
router.delete("/:id",deleteCloths);
router.put("/:id", updateCloth);

export default router;