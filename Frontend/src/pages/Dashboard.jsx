import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmplyee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeApi";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    employmentStatus: "Active",
  });
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmplyee(formData);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        designation: "",
        employmentStatus: "Active",
      });

      setShowForm(false);
      setEditingId(null);

      const response = await getEmployees({ search, status });
      setEmployees(response.data.employees);
    } catch (error) {
      setError(error.response?.data?.message || "failed to create employee");
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      designation: employee.designation,
      employmentStatus: employee.employmentStatus,
    });
    setEditingId(employee._id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      const response = await getEmployees({ search, status });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("failed to delete employee:", error);
      alert("failed to delete employee.please try again.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees({
          search,
          status,
        });
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("failed to get employee:", error);
      }
    };
    fetchEmployees();
  }, [search, status]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-red-400">
          Employee Dashboard
        </h1>
        <button
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              designation: "",
              employmentStatus: "Active",
            });

            setEditingId(null);
            setError("");
            setShowForm(true);
          }}
          className="mb-5 rounded-lg bg-red-400 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Employee
        </button>

        {showForm && (
          <form onSubmit={handleSubmit}   className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
>
            <h2 className="mb-5 text-xl font-bold text-slate-800">{editingId ? "Edit Employee" : "Add Employee"}</h2>
            <input
              name="name"
              placeholder="full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

            <input
              name="email"
              type="email"
              placeholder="EMail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

            <input
              name="phone"
              placeholder="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button type="submit"   className="rounded-lg bg-red-400 px-5 py-2.5 font-semibold text-white transition hover:bg-red-500"
>
              {editingId ? "update Employee" : "Save Employee"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>


            {error && <p>{error}</p>}
          </form>
        )}

        {/* search */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="search by name and email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
          {/* filer */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">InActive</option>
          </select>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-800px text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Designation</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-slate-700">
                      {employee.name}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {employee.email}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {employee.phone}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {employee.designation}
                    </td>
                    <td className="px-5 py-4">
                      {" "}
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          employee.employmentStatus === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {employee.employmentStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="mr-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        Edit
                      </button>
                 
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
