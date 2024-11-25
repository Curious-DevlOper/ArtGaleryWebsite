import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addArtwork, editArtwork, deleteArtwork } from '../../store/painting-slice';

const Artwork = () => {
  const artworks = useSelector((state) => state.painting.artworks);
  const dispatch = useDispatch();

  const [artworkData, setArtworkData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [isAddingArtwork, setIsAddingArtwork] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(null);

  const handleArtworkChange = (e) => {
    const { name, value } = e.target;
    setArtworkData({ ...artworkData, [name]: value });
  };

  const handleArtworkImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArtworkData({ ...artworkData, image: URL.createObjectURL(file) });
    }
  };

  const handleAddArtwork = (e) => {
    e.preventDefault();
    dispatch(addArtwork(artworkData));
    setArtworkData({ title: '', description: '', image: null });
    setIsAddingArtwork(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    dispatch(editArtwork({ index: currentArtworkIndex, updatedArtwork: artworkData }));
    setIsEditing(false);
    setArtworkData({ title: '', description: '', image: null });
    setCurrentArtworkIndex(null);
  };

  const handleDeleteArtwork = (index) => {
    dispatch(deleteArtwork(index));
  };

  const handleEditArtwork = (index) => {
    setCurrentArtworkIndex(index);
    setArtworkData(artworks[index]);
    setIsEditing(true);
  };

  return (
    <div className="mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => setIsAddingArtwork(true)}>
        Add Artwork
      </button>

      {/* Add/Edit Form */}
      {(isAddingArtwork || isEditing) && (
        <div className="card shadow p-4 mb-4">
          <h3>{isEditing ? 'Edit Artwork' : 'Add New Artwork'}</h3>
          <form onSubmit={isEditing ? handleSaveEdit : handleAddArtwork}>
            <div className="mb-3">
              <label htmlFor="artworkTitle" className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                id="artworkTitle"
                name="title"
                value={artworkData.title}
                onChange={handleArtworkChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="artworkDescription" className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                id="artworkDescription"
                name="description"
                rows="3"
                value={artworkData.description}
                onChange={handleArtworkChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="artworkImage" className="form-label fw-bold">Image</label>
              <input
                type="file"
                className="form-control"
                id="artworkImage"
                name="image"
                accept="image/*"
                onChange={handleArtworkImageChange}
                required={!isEditing}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Add Artwork'}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setIsAddingArtwork(false);
                setIsEditing(false);
                setArtworkData({ title: '', description: '', image: null });
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Artwork Display */}
      <div>
        <h3>Artworks</h3>
        {artworks.length > 0 ? (
          artworks.map((artwork, index) => (
            <div className="card mb-3" key={index}>
              {artwork.image && (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{artwork.title}</h5>
                <p className="card-text">{artwork.description}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEditArtwork(index)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteArtwork(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No artworks uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Artwork;
