import React, { useState } from 'react';
import axios from 'axios';
import { User } from './types/User';

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState('');

    const savedUser: User = JSON.parse(localStorage.getItem('user'));
    // console.log(savedUser);

  const upload = async () => {
    if (!file) return;
    const resp = await axios.get('http://localhost:8082/api/v1/upload/get-sign', {
        headers: {
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${savedUser.jwtToken}`
        }
    });
    console.log(resp.data);
    
    const fd = new FormData();
    fd.append('file', file);
    fd.append('resource_type', 'video');
    fd.append('api_key', resp.data.api_key);
    fd.append('timestamp', resp.data.timestamp);
    fd.append('signature', resp.data.signature);
    fd.append('public_id', resp.data.public_id);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${resp.data.cloud_name}/video/upload`,
      fd,
      {
        onUploadProgress: e => setProgress(Math.round((e.loaded * 100) / e.total))
      }
    );
    console.log(data);
    
    setUploadedUrl(data.secure_url);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} disabled={!file}>Upload</button>
      {progress > 0 && <p>Progress: {progress}%</p>}
      {uploadedUrl && <a href={uploadedUrl} target="_blank" rel="noopener">Uploaded Video</a>}
    </div>
  );
}

