import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getAllUserHistory, deleteRecord } from "@/services/HistoryService";
import { HistoryItem } from "@/types/History";

const History = () => {
  
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const rawData = await getAllUserHistory();
        console.log(rawData);
        
        if (Array.isArray(rawData)) {
          const parsed = rawData.map((item: any) => ({
            ...item,
            startDate: new Date(item.start_timestamp),
            endDate: new Date(item.end_timestamp),
          }));
          setHistoryData(parsed);
        } else {
          console.error('History data is not an array:', rawData);
          setHistoryData([]);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
        setHistoryData([]);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id: number) => {
    // In a real app, this would delete from the database
    console.log('Delete item:', id);
    await deleteRecord(id);
    window.location.reload();
  };

  const handleDownload = (url: string, filename: string) => {
    console.log("Download: ", url);
    
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = filename;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    const outputRoute = `/cloudinary-video-player?url=${encodeURIComponent(url)}`;
    window.open(outputRoute, '_blank')
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">
              DeepDetect AI
            </Link>
            <h1 className="text-3xl font-bold mt-2">Analysis History</h1>
            <p className="text-muted-foreground">View your previous deepfake detection results</p>
          </div>
          <Link to="/prediction">
            <Button variant="outline" className="hover-lift">
              New Analysis
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass-effect border-0 text-center animate-fade-in-up">
            <div className="text-2xl font-bold text-primary mb-2">{historyData.length}</div>
            <div className="text-sm text-muted-foreground">Total Analyses</div>
          </Card>
          
          <Card className="p-6 glass-effect border-0 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-2xl font-bold text-success mb-2">
              {historyData.filter(item => item.result === 'REAL').length}
            </div>
            <div className="text-sm text-muted-foreground">Authentic Videos</div>
          </Card>
          
          <Card className="p-6 glass-effect border-0 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl font-bold text-destructive mb-2">
              {historyData.filter(item => item.result === 'FAKE').length}
            </div>
            <div className="text-sm text-muted-foreground">Deepfakes Detected</div>
          </Card>
          
          <Card className="p-6 glass-effect border-0 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl font-bold text-accent mb-2">
              {historyData.reduce((sum, item) => sum + parseFloat(item.confidence), 0) / historyData.length}%
            </div>
            <div className="text-sm text-muted-foreground">Avg. Confidence</div>
          </Card>
        </div>

        {/* History Table */}
        <Card className="p-6 glass-effect border-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Analyses</h3>
            <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <option value="all">All Results</option>
              <option value="real">Authentic Only</option>
              <option value="fake">Deepfakes Only</option>
            </select>
          </div>

          {historyData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">No Analysis History</h4>
              <p className="text-muted-foreground mb-6">Start by analyzing your first video</p>
              <Link to="/prediction">
                <Button className="primary-gradient hover-lift">
                  Analyze Video
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {historyData.map((item, index) => {
                const filename = item.filename;
                const fileSize = item.size;
                const timeTaken = item.processing_time;
                
                return (
                  <div 
                    key={item.id} 
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* File Icon */}
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        
                        {/* File Info */}
                        <div>
                          <h4 className="font-semibold">{filename}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Start: {item.startDate.toLocaleDateString()} {item.startDate.toLocaleTimeString()}</span>
                            <span>Size: {fileSize}</span>
                            <span>Time: {timeTaken}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Result Badge */}
                        <Badge 
                          variant={item.result === 'REAL' ? 'default' : 'destructive'}
                          className={`${
                            item.result === 'REAL' 
                              ? 'bg-success/10 text-success border-success/20' 
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          {item.result === 'REAL' ? '✓ AUTHENTIC' : '⚠ DEEPFAKE'}
                        </Badge>
                        
                        {/* Confidence Score */}
                        <div className="text-center min-w-[80px]">
                          <div className="font-semibold">{item.confidence}</div>
                          <div className="text-xs text-muted-foreground">Confidence</div>
                        </div>
                        
                        {/* Status */}
                        <div className="text-center min-w-[80px]">
                          <div className="font-semibold capitalize">{item.status}</div>
                          <div className="text-xs text-muted-foreground">Status</div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {/* Download Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover-lift">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border border-border">
                              <DropdownMenuItem 
                                onClick={() => handleDownload(item.videoUrl, `original_${filename}`)}
                                className="cursor-pointer"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Download Original
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDownload(item.output_video_url, `prediction_${filename}`)}
                                className="cursor-pointer"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Download Prediction
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Delete with Confirmation */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover-lift text-destructive">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-background border border-border">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Analysis</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this analysis? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(item.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout - 2 Rows */}
                    <div className="md:hidden">
                      {/* First Row */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{filename}</h4>
                          <div className="text-xs text-muted-foreground">
                            Request ID: {item.requestId}
                          </div>
                        </div>
                         <div className="flex items-center space-x-2">
                           <Badge 
                             variant={item.result === 'real' ? 'default' : 'destructive'}
                             className={`text-xs ${
                               item.result === 'real' 
                                 ? 'bg-success/10 text-success border-success/20' 
                                 : 'bg-destructive/10 text-destructive border-destructive/20'
                             }`}
                           >
                             {item.result === 'real' ? '✓ REAL' : '⚠ FAKE'}
                           </Badge>
                           
                           {/* Download Dropdown Mobile */}
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="sm" className="hover-lift p-1">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end" className="bg-background border border-border">
                               <DropdownMenuItem 
                                 onClick={() => handleDownload(item.videoUrl, `original_${filename}`)}
                                 className="cursor-pointer"
                               >
                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                 </svg>
                                 Download Original
                               </DropdownMenuItem>
                               <DropdownMenuItem 
                                 onClick={() => handleDownload(item.output_video_url, `prediction_${filename}`)}
                                 className="cursor-pointer"
                               >
                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                 </svg>
                                 Download Prediction
                               </DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>

                           {/* Delete with Confirmation Mobile */}
                           <AlertDialog>
                             <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="sm" className="hover-lift text-destructive p-1">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                 </svg>
                               </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent className="bg-background border border-border">
                               <AlertDialogHeader>
                                 <AlertDialogTitle>Delete Analysis</AlertDialogTitle>
                                 <AlertDialogDescription>
                                   Are you sure you want to delete this analysis? This action cannot be undone.
                                 </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction 
                                   onClick={() => handleDelete(item.id)}
                                   className="bg-destructive hover:bg-destructive/90"
                                 >
                                   Delete
                                 </AlertDialogAction>
                               </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                         </div>
                      </div>

                      {/* Second Row */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Start Date:</span>
                          <div className="font-medium">{item.startDate.toLocaleDateString()}</div>
                          <div className="text-muted-foreground text-xs">{item.startDate.toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Complete Date:</span>
                          <div className="font-medium">{item.endDate.toLocaleDateString()}</div>
                          <div className="text-muted-foreground text-xs">{item.endDate.toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">File Size:</span>
                          <div className="font-medium">{fileSize}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time Taken:</span>
                          <div className="font-medium">{timeTaken}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="font-medium">{item.confidence}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-medium capitalize">{item.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default History;