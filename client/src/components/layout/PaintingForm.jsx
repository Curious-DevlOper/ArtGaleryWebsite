// components/PaintingForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addArtwork } from '../../store/painting-slice';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaintingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    biography: '',
    image: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the form data to Redux store
    dispatch(addArtwork(formData));

    // Reset form
    setFormData({
      title: '',
      artist: '',
      biography: '',
      image: null,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add Painting</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artist</label>
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
          <label htmlFor="biography" className="form-label">Biography</label>
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
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PaintingForm;
