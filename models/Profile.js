import { Schema as _Schema, model } from 'mongoose';
import mongoose from 'mongoose';


const ProfileSchema = new _Schema({
    user: {
    type: _Schema.Types.ObjectId,  //associate user by Id
    ref: 'users' //refrens the collection that it refers to
    }, 
    handle: {
        type: String,
        requirred : true,
        max: 40
    },
    company: {
        type: String,

    },
    website: {
        type: String,
    },
    location: {
        type: String
      },
    status: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },
    githubusername: {
      type: String
    },
    experience: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ],
    education: [
      {
        school: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldofstudy: {
          type: String,
          required: true
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ],
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    }

});

const Profile = model('profile', ProfileSchema);
export default Profile;