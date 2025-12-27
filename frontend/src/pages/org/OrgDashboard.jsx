import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import EmployeeList from "../../components/org/EmployeeList.jsx";
import { decodeToken } from "../../utils/decodeToken.js";
import { getOrgByIdAPI } from "../../api/org.api.js";
import {
  getEmployeesByOrgAPI,
  searchEmployeeAPI,
} from "../../api/employee.api.js";

const OrgDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [org, setOrg] = useState(null);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded?.id) {
      fetchOrg(decoded.id);
    } else {
      setLoadingOrg(false);
    }
  }, []);

  useEffect(() => {
    if (!loadingOrg) {
      if (searchText) {
        handleSearch(searchText);
      } else {
        fetchEmployees();
      }
    }
  }, [searchText, loadingOrg]);

  const fetchOrg = async (orgId) => {
    try {
      const res = await getOrgByIdAPI(orgId);
      const orgData = res.data.organization;
      setOrg(orgData);
      setLoadingOrg(false);
      // load employees for this org
      fetchEmployees(orgData.orgName);
    } catch (err) {
      console.error("Failed to fetch org:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch organization");
      setLoadingOrg(false);
    }
  };

  const fetchEmployees = async (orgName) => {
    try {
      const name = orgName || org?.orgName;
      if (!name) return;
      const res = await getEmployeesByOrgAPI(name);
      setEmployees(res.data.employees || res.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployees([]);
    }
  };

  const handleSearch = async (text) => {
    try {
      const params = { name: text };
      if (org?.orgName) params.org = org.orgName;
      const res = await searchEmployeeAPI(params);
      setEmployees(res.data || []);
    } catch (err) {
      console.error("Search failed:", err);
      setEmployees([]);
    }
  };

  if (loadingOrg) return <p>Loading organization...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", width: "100%" }}>
        <h1>Welcome to {org?.orgName}</h1>
        <h2>Organization Dashboard</h2>
        <SearchBar onSearch={setSearchText} />
        <EmployeeList employees={employees} />
      </div>
    </div>
    
  );
};

export default OrgDashboard;