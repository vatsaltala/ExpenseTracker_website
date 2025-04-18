import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Issue = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://localhost:3000/issue/issues");
      setIssues(response.data.data || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">📋 User Reported Issues</h2>

      {loading ? (
        <div className="text-center text-muted">Loading issues...</div>
      ) : issues.length === 0 ? (
        <div className="text-center text-warning">No issues found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.name || 'N/A'}</td>
                  <td>{issue.email}</td>
                  <td>{issue.message}</td>
                  <td>{new Date(issue.Date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
