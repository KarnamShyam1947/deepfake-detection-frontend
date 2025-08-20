import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import axios from 'axios';
import { sendClassifyEvent } from "@/services/ClassifyService";

type PredictionStage = 'upload' | 'uploading' | 'uploaded';

interface User {
  id: string;
  email: string;
  name: string;
  jwtToken: string;
}

const Prediction = () => {
  const [stage, setStage] = useState<PredictionStage>('upload');
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('video')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a video file (MP4, WebM, AVI, MOV).",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload videos.",
        variant: "destructive"
      });
      return;
    }

    try {
      setStage('uploading');
      setProgress(0);

      // Get signed upload credentials
      const savedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
      const resp = await axios.get('http://localhost:8082/api/v1/upload/get-sign', {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${savedUser.jwtToken}`
        }
      });

      // Upload to Cloudinary
      const fd = new FormData();
      fd.append('file', file);
      fd.append('resource_type', 'video');
      fd.append('api_key', resp.data.api_key);
      fd.append('timestamp', resp.data.timestamp);
      fd.append('signature', resp.data.signature);
      fd.append('public_id', resp.data.public_id);
      fd.append('folder', resp.data.folder);

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${resp.data.cloud_name}/video/upload`,
        fd,
        {
          onUploadProgress: e => {
            const progressPercent = Math.round((e.loaded * 100) / (e.total || 1));
            setProgress(progressPercent);
          }
        }
      );

      // TODO: With uploaded result call classification api

      setUploadedUrl(data.secure_url);
      setStage('uploaded');

      toast({
        title: "Upload Successful!",
        description: "Video uploaded successfully. Redirecting to history...",
      });

      sendClassifyEvent(data.secure_url, data.bytes, data.original_filename, data.format, data.duration);
      
      setTimeout(() => {
        navigate('/history');
      }, 3000);

    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload video. Please try again.",
        variant: "destructive"
      });
      setStage('upload');
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const resetPrediction = () => {
    setStage('upload');
    setProgress(0);
    setUploadedUrl('');
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">
              DeepDetect AI
            </Link>
            <h1 className="text-3xl font-bold mt-2">Video Analysis</h1>
            <p className="text-muted-foreground">Upload a video to detect deepfake manipulation</p>
          </div>
          <Link to="/history">
            <Button variant="outline" className="hover-lift">
              View History
            </Button>
          </Link>
        </div>

        {/* Upload Stage */}
        {stage === 'upload' && (
          <Card className="max-w-2xl mx-auto p-8 glass-effect border-0 animate-fade-in-up">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 1v1a1 1 0 001 1h8a1 1 0 001-1V5m-9 4h10l-1 7H9l-1-7z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Upload Video for Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop your video here, or click to browse
              </p>
              
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="video-upload"
              />
              
              <Button style={{cursor: "pointer"}} variant="outline">
                <label style={{cursor: "pointer"}} htmlFor="video-upload">
                    Choose Video File
                </label>
              </Button>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Supported formats: MP4, WebM, AVI, MOV</p>
                <p>Maximum file size: 500MB</p>
              </div>
            </div>
          </Card>
        )}

        {/* Uploading Stage */}
        {stage === 'uploading' && (
          <Card className="max-w-2xl mx-auto p-8 glass-effect border-0 animate-fade-in-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-neural rounded-full flex items-center justify-center mx-auto mb-6 animate-neural">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Uploading Video...</h3>
              <p className="text-muted-foreground mb-8">
                Uploading your video to the cloud for analysis
              </p>
              
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
              
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">Secure</div>
                  <div className="text-muted-foreground">Cloud Upload</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-accent">Encrypted</div>
                  <div className="text-muted-foreground">Transfer</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Upload Success Stage */}
        {stage === 'uploaded' && (
          <Card className="max-w-2xl mx-auto p-8 glass-effect border-0 animate-fade-in-up">
            <div className="text-center">
              <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Upload Successful!</h3>
              <p className="text-muted-foreground mb-6">
                Your video has been uploaded successfully. You will be redirected to the history page where you can track the prediction progress.
              </p>
              
              {uploadedUrl && (
                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Video URL:</p>
                  <a 
                    href={uploadedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm break-all"
                  >
                    {uploadedUrl}
                  </a>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <Button onClick={() => navigate('/history')} className="primary-gradient hover-lift">
                  Go to History
                </Button>
                <Button onClick={resetPrediction} variant="outline" className="hover-lift">
                  Upload Another Video
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Prediction;
