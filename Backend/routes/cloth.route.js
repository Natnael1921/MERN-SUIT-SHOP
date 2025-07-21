import express from "express";
import { addCloths, deleteCloths, getCloths } from "../controllers/cloth.controller.js";

const router=express.Router();

router.post("/",addCloths);
router.get("/",getCloths);
router.delete("/:id",deleteCloths);

export default router;