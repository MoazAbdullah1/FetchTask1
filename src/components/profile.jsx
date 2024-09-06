import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          "api/user/profile/fetch",
          { email: "muhammad_4@mutare.group" },
          {
            headers: { "Content-Type": "application/json" },
          }
        );


        setProfile(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error Message:", error.message);
        if (error.response) {
          console.error("API Error Response:", error.response);
          setError(
            `Error: ${error.response.status} - ${error.response.data.message || error.response.data}`
          );
        } else if (error.request) {
          console.error("API Error Request:", error.request);
          setError("No response from the server.");
        } else {
          console.error("API Error Configuration:", error.config);
          setError("Unexpected error occurred. Please check your setup.");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      {profile && (
        <div className="profile-details">
          <div className="profile-header">
            <h1>{profile.username}'s Profile</h1>
            {profile.profile_picture ? (
  <img
    // src={profile.profile_picture}
    src="./pic.png"
    alt="Profile"
    className="profile-picture"
  />
) : (
  <img
    // src="./pic.png"
    src={profile.profile_picture}
    alt="Default Profile"
    className="profile-picture"
  />
)}

          </div>
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profile.dob.day}/
              {profile.dob.month}/{profile.dob.year}
            </p>
            <p>
              <strong>Country:</strong> {profile.country}
            </p>
            <p>
              <strong>Subscription Status:</strong> {profile.subscription}
            </p>
            <p>
              <strong>Device Name:</strong> {profile.device_name || "N/A"}
            </p>
            <p>
              <strong>Device ID:</strong> {profile.device_id}
            </p>
          </div>
          <h2>Preference Groups</h2>
          {profile.preference_group.map((group, index) => (
            <div key={index} className="preference-group">
              <h3>{group.group}</h3>
              <p>
                <strong>Subgroup:</strong> {group.subgroup}
              </p>
              <p>
                <strong>Choice:</strong> {group.choice}
              </p>
              <p>
                <strong>Preference:</strong> {group.set[0].like ? "Like" : group.set[0].neutral ? "Neutral" : "Dislike"}
              </p>
            </div>
          ))}
          <h2>Additional Information</h2>
          <div className="additional-info">
            <p>
              <strong>ID:</strong> {profile.id}
            </p>
            <p>
              <strong>Resource ID (_rid):</strong> {profile._rid}
            </p>
            <p>
              <strong>Self Link (_self):</strong> {profile._self}
            </p>
            <p>
              <strong>ETag (_etag):</strong> {profile._etag}
            </p>
            <p>
              <strong>Attachments (_attachments):</strong>{" "}
              {profile._attachments}
            </p>
            <p>
              <strong>Timestamp (_ts):</strong> {profile._ts}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
