import React, { useEffect, useState } from "react";
import request from "../../config/axios";
import "./StatsPage.css";

const StatsPage = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [carCount, setCarCount] = useState([]);

  useEffect(() => {
    request({
      method: "get",
      url: `getAllUsers`,
    })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    request({
      method: "get",
      url: `getCarCount`,
    })
      .then((response) => {
        console.log(response.data);
        setCarCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    request({
      method: "get",
      url: `getUserCount`,
    })
      .then((response) => {
        console.log(response.data);
        setUserCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home-container">
      <table>
        <thead>
          <tr class="table-header">
            <th>Number of User </th>
            <th>Number of Cars</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row">
            <td>{userCount}</td>
            <td>{carCount}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr class="table-header">
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <tr class="table-row">
              <td>{x.name}</td>
              <td>{x.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
