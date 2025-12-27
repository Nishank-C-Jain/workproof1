          import { useEffect, useState } from "react";
          import { decodeToken } from "../../utils/decodeToken.js";
          import { getOrgByIdAPI } from "../../api/org.api.js";
          import "../auth/auth.css";


          const OrgProfile = () => {
            const [org, setOrg] = useState(null);
            const [error, setError] = useState(null);

            useEffect(() => {
              const decoded = decodeToken();
              if (decoded?.id) {
                fetchOrg(decoded.id);
              }
            }, []);

            const fetchOrg = async (orgId) => {
              try {
                const res = await getOrgByIdAPI(orgId);
                setOrg(res.data.organization);
              } catch (err) {
                console.error("Failed to fetch org:", err);
                setError(err.response?.data?.message || err.message || "Failed to fetch organization");
              }
            };

            if (error) return <p>Error: {error}</p>;
            if (!org) return <p>Loading...</p>;

            return (
              <div className ="auth-container">
                <div className="auth-card">
                <h2>Organization Profile</h2>
                <p><b>Name:</b> {org.orgName}</p>
                <p><b>Production Type:</b> {org.orgType}</p>
                <p><b>Email:</b> {org.orgEmail}</p>
                <p><b>Mobile:</b> {org.mobileNumber}</p>
                <p><b>Address:</b> {org.address}</p>
                <p><b>Created At:</b> {new Date(org.createdAt).toLocaleDateString()}</p>
                <p><b>Description:</b> {org.description}</p>
                <p><b></b></p>
              </div>
              </div>
            );
          };

          export default OrgProfile;
