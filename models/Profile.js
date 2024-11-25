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
   
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },
 

    education: [
      {
        
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
        }
       
      }
    ],
    social: {
      
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