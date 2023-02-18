import React, { useState, useEffect } from "react";

const SearchUserList = () => {
  const [userList, setusers] = useState(null);
  const [searchtxt, setSearch] = useState("");

  useEffect(() => {
    getuesers("http://restapi.adequateshop.com/api/Metadata/users");
  }, []);

  const getuesers = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setusers(result);
        },
        (error) => {
          console.log(error);
          setusers(null);
        }
      );
  };

  const handleValue = (e) => {
    setSearch(e.target.value);
  };

  const searchUser = (e) => {
    e.preventDefault();
    getuesers(
      "http://restapi.adequateshop.com/api/Metadata/GetUsersByParam?city=" +
        searchtxt
    );
  };
  if (!userList) return <div>No Record Found</div>;

  return (
    <div>
      <h2>Users List Funcational Component </h2>
      <div className="row">
        <div className="col-sm-6">
          <input
            type="text"
            name="city"
            className="form-control"
            value={searchtxt}
            placeholder="city"
            onChange={(e) => handleValue(e)}
          />
        </div>
        <div className="col-sm-6">
          <input
            className="btn btn-primary btnsubmit"
            type="submit"
            value="Search"
            onClick={searchUser}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>ZipCode</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr>
              <td>{user.Id}</td>
              <td>{user.Name}</td>
              <td>{user.Address}</td>
              <td>{user.City}</td>
              <td>{user.ZipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SearchUserList;
