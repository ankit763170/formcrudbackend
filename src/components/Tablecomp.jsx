import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tablecomp.css"; // Import CSS file for styling

const Tablecomp = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [newData, setNewData] = useState({
    name: "",
    LastName: "",
    email: "",
    MobileNum: "",
    project: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const startEdit = (id, data) => {
    setEditing(true);
    setEditingId(id);
    setEditingData(data);
  };

  const finishEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/${editingId}`, editingData);
      setEditing(false);
      setEditingId(null);
      setEditingData({});
      const response = await axios.get("http://localhost:3000");
      setData(response.data.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      const response = await axios.get("http://localhost:3000");
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  async function createData(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000", newData);
      setData([...data, response.data.data]);
      setNewData({
        name: "",
        LastName: "",
        email: "",
        MobileNum: "",
        project: "",
      });
    } catch (error) {
      console.error("Error creating data:", error);
    }
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Project</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((d) => (
              <tr key={d._id}>
                <td>
                  {editing && editingId === d._id ? (
                    <input
                      type="text"
                      value={editingData.name || ""}
                      onChange={(e) =>
                        setEditingData({ ...editingData, name: e.target.value })
                      }
                    />
                  ) : (
                    d.name
                  )}
                </td>
                <td>
                  {editing && editingId === d._id ? (
                    <input
                      type="text"
                      value={editingData.LastName || ""}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          LastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.LastName
                  )}
                </td>
                <td>
                  {editing && editingId === d._id ? (
                    <input
                      type="text"
                      value={editingData.email || ""}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.email
                  )}
                </td>
                <td>
                  {editing && editingId === d._id ? (
                    <input
                      type="text"
                      value={editingData.MobileNum || ""}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          MobileNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.MobileNum || ""
                  )}
                </td>
                <td>
                  {editing && editingId === d._id ? (
                    <input
                      type="text"
                      value={editingData.project || ""}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          project: e.target.value,
                        })
                      }
                    />
                  ) : (
                    d.project
                  )}
                </td>
                <td>
                  {editing && editingId === d._id ? (
                    <>
                      <button className="save-btn" onClick={finishEdit}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => startEdit(d._id, d)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteData(d._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="add-data">
        <h2>Add New Data</h2>
        <form onSubmit={createData}>
          <label>
            Name:
            <input
              type="text"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={newData.LastName}
              onChange={(e) =>
                setNewData({ ...newData, LastName: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={newData.email}
              onChange={(e) =>
                setNewData({ ...newData, email: e.target.value })
              }
            />
          </label>
          <label>
            Mobile No.:
            <input
              type="text"
              value={newData.MobileNum}
              onChange={(e) =>
                setNewData({ ...newData, MobileNum: e.target.value })
              }
            />
          </label>
          <label>
            Project:
            <input
              type="text"
              value={newData.project}
              onChange={(e) =>
                setNewData({ ...newData, project: e.target.value })
              }
            />
          </label>
          <button className="create-btn" onClick={createData}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tablecomp;
