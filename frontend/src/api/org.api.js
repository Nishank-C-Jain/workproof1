import axiosInstance from "./axiosInstance";

// Get organization by ID
export const getOrgByIdAPI = (orgId) => {
  return axiosInstance.get(`/organizations/getOrgProfile/${orgId}`);
};

// Register organization
export const registerOrg = (data) => {
  return axiosInstance.post("/organizations/create", data);
};

// Organization login
export const orgLoginAPI = (data) => {
  return axiosInstance.post("/organizations/login", data);
};

export const getEmployeesByOrgAPI = (orgName) => {
  return axiosInstance.get(`/employees/org/${orgName}`);
};

