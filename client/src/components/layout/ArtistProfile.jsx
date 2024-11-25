import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Artwork from './Artwork'; // Import the Artwork component

const ArtistProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [artistData, setArtistData] = useState({
    artist: 'Homayoun',
    biography: 'Homayoon is a multifaceted artist whose work spans painting, design, and printmaking. With a strong academic foundation and participation in numerous exhibitions both in Iran and internationally.',
    image: null, // Initially no profile picture
  });

  const [formData, setFormData] = useState({ ...artistData });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: imageUrl,
      });
      if (artistData.image) {
        URL.revokeObjectURL(artistData.image);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setArtistData({ ...formData });
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      {isEditing ? (
        <div className="card shadow p-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Profile Preview"
              className="img-thumbnail mb-3 mx-auto d-block"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
            />
          )}
          <h2 className="mb-4 text-center">Edit Profile</h2>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label htmlFor="artist" className="form-label fw-bold">Artist</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="biography" className="form-label fw-bold">Biography</label>
              <textarea
                className="form-control"
                id="biography"
                name="biography"
                rows="3"
                value={formData.biography}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label fw-bold">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2">Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card shadow p-4">
          {artistData.image && (
            <img
              src={artistData.image}
              alt="Profile"
              className="img-thumbnail mb-3 mx-auto d-block"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
            />
          )}
          <h2 className="mb-4 text-center">Artist Profile</h2>
          <p className="fw-bold">Name:</p>
          <p>{artistData.artist}</p>
          <p className="fw-bold">Biography:</p>
          <p>{artistData.biography}</p>
          <button className="btn btn-primary mt-3" onClick={handleEditToggle}>
            Edit
          </button>
        </div>
      )}

      {/* Artworks Section */}
      <Artwork />
    </div>
  );
};

export default ArtistProfile;
