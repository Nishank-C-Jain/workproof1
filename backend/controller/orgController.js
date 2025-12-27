import Organization from "../models/org.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Route 1: Create Organization
export const createOrganization = async (req, res) => {
  try {
      const { orgName, orgType, description, password, orgEmail, orgMobile, address } = req.body;

    if (!orgName || !orgType || !password) {
      return res.status(400).json({
        message: "orgName, orgType and password are required"
      });
    }

    const exists = await Organization.findOne({ orgName });
    if (exists) {
      return res.status(400).json({
        message: "Organization already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await Organization.create({
      orgName,
      orgType,
      description,
      orgEmail,
      mobileNumber: orgMobile,
      password: hashedPassword,
      address
    });

    res.status(201).json({
      message: "Organization created successfully",
      organization
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//   Route 2: LOGIN ORGANIZATION
export const loginOrganization = async (req, res) => {
  try {
    const { orgEmail, password } = req.body;

    if (!orgEmail || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }
    const organization = await Organization.findOne({ orgEmail });
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found"
      });
    }

    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    //  CREATE JWT TOKEN HERE (ORG LOGIN)
    const token = jwt.sign(
      {
        id: organization._id,
        role: organization.role,
        orgMobile: organization.mobileNumber,
        orgEmail: organization.orgEmail
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Organization login successful",
      token,
      data:{
        orgId: organization._id,
        orgName: organization.orgName,
        role: "Admin",
        orgEmail: organization.orgEmail,
        orgAddress: organization.address,
        orgMobile: organization.mobileNumber,
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route 3: GET ORGANIZATION PROFILE BY ID
export const getOrganizationByIdProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id).select("-password");

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found"
      });
    }

    // Normalize response so frontend can use `email` as before
    const organizationObj = organization.toObject();
    organizationObj.email = organizationObj.orgEmail || organizationObj.email;

    res.status(200).json({
      message: "Organization fetched successfully",
      organization: organizationObj
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

