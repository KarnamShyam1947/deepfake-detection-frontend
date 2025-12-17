// import { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/contexts/AuthContext";

// interface PredictionResult {
//   id: number;
//   userId: number;
//   startDate: Date;
//   endDate: Date;
//   result: string;
//   status: string;
//   videoUrl: string;
//   requestId: string;
//   confidence: number;
//   outputVideoUrl: string;
// }

// const PredictionResult = () => {
//   const [prediction, setPrediction] = useState<PredictionResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const { id } = useParams();
//   // const { user } = useAuth();
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // if (!user) {
//     //   navigate('/login');
//     //   return;
//     // }

//     // Simulate async prediction process
//     const simulatePrediction = async () => {
//       try {
//         // Simulate progress updates
//         const interval = setInterval(() => {
//           setProgress(prev => {
//             if (prev >= 100) {
//               clearInterval(interval);
//               return 100;
//             }
//             return prev + Math.random() * 10;
//           });
//         }, 500);

//         // Simulate API call to get prediction status
//         await new Promise(resolve => setTimeout(resolve, 5000));
//         clearInterval(interval);
//         setProgress(100);

//         // Mock prediction result
//         const mockResult: PredictionResult = {
//           id: parseInt(id || '1'),
//           userId: parseInt( "101"),
//           startDate: new Date(Date.now() - 5000),
//           endDate: new Date(),
//           result: Math.random() > 0.5 ? 'authentic' : 'deepfake',
//           status: 'completed',
//           videoUrl: 'https://example.com/video.mp4',
//           requestId: `req_${Date.now()}`,
//           confidence: Math.random() > 0.5 ? 92.5 : 15.3,
//           outputVideoUrl: 'https://example.com/output.mp4'
//         };

//         setPrediction(mockResult);
//         setLoading(false);

//         toast({
//           title: "Analysis Complete!",
//           description: `Detection result: ${mockResult.result.toUpperCase()} (${mockResult.confidence}% confidence)`,
//         });
//       } catch (error) {
//         console.error('Prediction failed:', error);
//         toast({
//           title: "Analysis Failed",
//           description: "Failed to analyze video. Please try again.",
//           variant: "destructive"
//         });
//         setLoading(false);
//       }
//     };

//     simulatePrediction();
//   }, [id, navigate, toast]);

//   // if (!user) {
//   //   return null;
//   // }

//   return (
//     <div className="min-h-screen hero-gradient">
//       {/* Header */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <Link to="/" className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">
//               DeepDetect AI
//             </Link>
//             <h1 className="text-3xl font-bold mt-2">Prediction Result</h1>
//             <p className="text-muted-foreground">Real-time analysis progress and results</p>
//           </div>
//           <Link to="/history">
//             <Button variant="outline" className="hover-lift">
//               Back to History
//             </Button>
//           </Link>
//         </div>

//         {/* Processing Stage */}
//         {loading && (
//           <Card className="max-w-2xl mx-auto p-8 glass-effect border-0 animate-fade-in-up">
//             <div className="text-center">
//               <div className="w-24 h-24 bg-gradient-neural rounded-full flex items-center justify-center mx-auto mb-6 animate-neural">
//                 <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>

//               <h3 className="text-2xl font-semibold mb-4">Analyzing Video...</h3>
//               <p className="text-muted-foreground mb-8">
//                 Our AI is examining your video for signs of manipulation
//               </p>

//               <Progress value={progress} className="mb-4" />
//               <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>

//               <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
//                 <div className="text-center">
//                   <div className="text-lg font-semibold text-primary">1.2M+</div>
//                   <div className="text-muted-foreground">Frames Analyzed</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-semibold text-accent">47</div>
//                   <div className="text-muted-foreground">AI Models Used</div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         )}

//         {/* Results Stage */}
//         {!loading && prediction && (
//           <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
//             {/* Result Header */}
//             <Card className="p-8 glass-effect border-0">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-2xl font-semibold mb-2">Analysis Complete</h3>
//                   <p className="text-muted-foreground">Request ID: {prediction.requestId}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-3xl font-bold mb-1">
//                     <span className={prediction.result === 'authentic' ? 'text-success' : 'text-destructive'}>
//                       {prediction.confidence}%
//                     </span>
//                   </div>
//                   <div className="text-sm text-muted-foreground">Confidence</div>
//                 </div>
//               </div>

//               <div className={`text-center p-6 rounded-xl ${
//                 prediction.result === 'authentic'
//                   ? 'bg-success/10 border-2 border-success/20' 
//                   : 'bg-destructive/10 border-2 border-destructive/20'
//               }`}>
//                 <div className={`text-4xl font-bold mb-2 ${
//                   prediction.result === 'authentic' ? 'text-success' : 'text-destructive'
//                 }`}>
//                   {prediction.result === 'authentic' ? '✓ AUTHENTIC' : '⚠ DEEPFAKE DETECTED'}
//                 </div>
//                 <p className="text-muted-foreground">
//                   {prediction.result === 'authentic'
//                     ? 'This video appears to be authentic with no signs of manipulation.'
//                     : 'Our AI has detected signs of deepfake manipulation in this video.'
//                   }
//                 </p>
//               </div>
//             </Card>

//             {/* Technical Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card className="p-6 glass-effect border-0 text-center">
//                 <div className="text-2xl font-bold text-primary mb-2">
//                   {((prediction.endDate.getTime() - prediction.startDate.getTime()) / 1000).toFixed(1)}s
//                 </div>
//                 <div className="text-sm text-muted-foreground">Processing Time</div>
//               </Card>

//               <Card className="p-6 glass-effect border-0 text-center">
//                 <div className="text-2xl font-bold text-accent mb-2">{Math.floor(Math.random() * 1000) + 500}</div>
//                 <div className="text-sm text-muted-foreground">Frames Analyzed</div>
//               </Card>

//               <Card className="p-6 glass-effect border-0 text-center">
//                 <div className="text-2xl font-bold text-secondary mb-2">47</div>
//                 <div className="text-sm text-muted-foreground">AI Models Used</div>
//               </Card>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-center space-x-4">
//               <Button onClick={() => navigate('/prediction')} className="primary-gradient hover-lift">
//                 Analyze Another Video
//               </Button>
//               <Button variant="outline" className="hover-lift">
//                 Download Report
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="hover-lift"
//                 onClick={() => window.open(prediction.videoUrl, '_blank')}
//               >
//                 View Original Video
//               </Button>
//               {prediction.outputVideoUrl && (
//                 <Button 
//                   variant="outline" 
//                   className="hover-lift"
//                   onClick={() => window.open(prediction.outputVideoUrl, '_blank')}
//                 >
//                   View Analysis Video
//                 </Button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PredictionResult;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PredictionResult {
  id: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  result: string;
  status: string;
  videoUrl: File;
  requestId: string;
  confidence: number;
  outputVideoUrl: string;
  processingTime: String;
}

const PredictionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction: PredictionResult | undefined = location.state?.prediction;

  if (!prediction) {
    // Handle missing data, e.g., navigate back or show a message
    return <div>No prediction data—please start a new analysis.</div>;
  }

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">
              DeepDetect AI
            </Link>
            <h1 className="text-3xl font-bold mt-2">Prediction Result</h1>
            <p className="text-muted-foreground">Real-time analysis result summary</p>
          </div>
          <Link to="/history">
            <Button variant="outline" className="hover-lift">
              Back to History
            </Button>
          </Link>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          {/* Summary Card */}
          <Card className="p-8 glass-effect border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Analysis Complete</h3>
                <p className="text-muted-foreground">Request ID: {prediction.requestId}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  <span className={prediction.result === 'authentic' ? 'text-success' : 'text-destructive'}>
                    {prediction.confidence}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
            </div>

            <div className={`text-center p-6 rounded-xl ${prediction.result === 'authentic'
              ? 'bg-success/10 border-2 border-success/20'
              : 'bg-destructive/10 border-2 border-destructive/20'
              }`}>
              <div className={`text-4xl font-bold mb-2 ${prediction.result === 'authentic' ? 'text-success' : 'text-destructive'
                }`}>
                {prediction.result === 'authentic' ? '✓ AUTHENTIC' : '⚠ DEEPFAKE DETECTED'}
              </div>
              <p className="text-muted-foreground">
                {prediction.result === 'authentic'
                  ? 'This video appears to be authentic with no signs of manipulation.'
                  : 'Our AI has detected signs of deepfake manipulation in this video.'}
              </p>
            </div>
          </Card>

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 glass-effect border-0 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {prediction.processingTime}
              </div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </Card>

            <Card className="p-6 glass-effect border-0 text-center">
              <div className="text-2xl font-bold text-accent mb-2">
                {Math.floor(Math.random() * 1000) + 500}
              </div>
              <div className="text-sm text-muted-foreground">Frames Analyzed</div>
            </Card>

            <Card className="p-6 glass-effect border-0 text-center">
              <div className="text-2xl font-bold text-secondary mb-2">47</div>
              <div className="text-sm text-muted-foreground">AI Models Used</div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            <Button onClick={() => navigate('/prediction')} className=" hover-lift">
              Analyze Another Video
            </Button>

            <Button
              variant="outline"
              className="hover-lift"
              onClick={() => {
                const video = URL.createObjectURL(prediction.videoUrl);
                window.open(video, '_blank');
              }}
            >
              View Original Video
            </Button>

            {prediction.outputVideoUrl && (
              <Button
                variant="outline"
                className="hover-lift"
                onClick={() => {
                  const outputRoute = `/cloudinary-video-player?url=${encodeURIComponent(prediction.outputVideoUrl)}`;
                  window.open(outputRoute, '_blank')
                }}
              >
                View Analysis Video
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
