import { useAuth } from "../context/useAuth";
const ProfilePage = () => {

  const { isLoggedIn } = useAuth();

  // Retrieve user data from localStorage
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userData = user ? JSON.parse(user) : null;
  

  if (!isLoggedIn || !userData) {
    return (
      <div className="flex justify-center items-center h-full p-4 mt-24">
        <p className="text-lg font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 ">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <p><strong>UserId:</strong> {userData._id || "N/A"}</p>
        <p><strong>Username:</strong> {userData.username || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
