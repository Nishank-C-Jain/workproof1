import express from "express";
import {
  createOrganization,
  loginOrganization,
  getOrganizationByIdProfile
} from "../controller/orgController.js";
import { verifyOrg } from "../middleware/verifyOrgMiddleware.js";
import orgAdminOnly from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create organization (company profile)
router.post("/create", createOrganization);

// Login organization (JWT generated here)
router.post("/login",  loginOrganization);

//get organization profile by id
router.get("/getOrgProfile/:id", authMiddleware, orgAdminOnly, getOrganizationByIdProfile);

export default router;
