import React, { useState, useRef } from "react";

const VideoWallpaperApp = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const videoRef = useRef(null);

  const pickVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const videoURL = URL.createObjectURL(file);
      setSelectedVideo({
        uri: videoURL,
        name: file.name,
        type: file.type,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to pick video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const simulateSetWallpaper = async () => {
    if (!selectedVideo) {
      alert("Please select a video first.");
      return;
    }

    setIsApplying(true);
    setAnimationStage(1);

    // Simulate wallpaper application process with stages
    const stages = [1, 2, 3];
    for (let stage of stages) {
      setAnimationStage(stage);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsApplying(false);
    setAnimationStage(0);
    alert("Video wallpaper set successfully!");
  };

  const clearSelection = () => {
    setSelectedVideo(null);
  };

  // Floating particles background animation
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  // Wallpaper application animation stages
  const ApplicationStages = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center p-8 max-w-sm">
        <div className="relative mb-6">
          {/* Animated phone mockup */}
          <div className="w-48 h-96 mx-auto bg-gray-900 rounded-3xl border-4 border-gray-700 relative overflow-hidden">
            <div className="absolute inset-2 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl animate-pulse">
              {/* Animated wallpaper preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20 animate-gradient-x" />

              {/* Floating icons */}
              <div
                className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-xl animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="absolute bottom-20 left-8 w-12 h-12 bg-white/30 rounded-2xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-20 right-8 w-10 h-10 bg-white/25 rounded-xl animate-bounce"
                style={{ animationDelay: "0.7s" }}
              />
            </div>
          </div>

          {/* Progress ring */}
          <div className="absolute -inset-4">
            <div className="w-56 h-56 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin-slow" />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 animate-pulse">
          {animationStage === 1 && "Processing Video..."}
          {animationStage === 2 && "Optimizing for Screen..."}
          {animationStage === 3 && "Applying Wallpaper..."}
        </h3>

        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                animationStage >= stage
                  ? "bg-green-500 scale-125"
                  : "bg-gray-600"
              } ${animationStage === stage ? "animate-ping" : ""}`}
            />
          ))}
        </div>

        <p className="text-gray-400 text-sm animate-fade-in">
          Your screen will come alive in moments...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans overflow-hidden relative">
      <FloatingParticles />

      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-600/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-600/10 rounded-full blur-xl animate-pulse delay-500" />

      {/* Header with animated gradient */}
      <div className="relative bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 py-10 px-6 text-center rounded-b-3xl backdrop-blur-sm border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
          Video Wallpaper
        </h1>
        <p className="text-sm text-gray-300 animate-fade-in-up">
          Transform your screen with dynamic videos
        </p>

        {/* Animated underline */}
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-6 max-w-3xl mx-auto relative z-10">
        {/* Preview Section with glass morphism */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Preview
            </span>
            <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full animate-pulse">
              LIVE
            </span>
          </h2>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden min-h-[200px] flex items-center justify-center border border-white/10 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02]">
            {selectedVideo ? (
              <div className="relative w-full group">
                <video
                  ref={videoRef}
                  src={selectedVideo.uri}
                  className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-sm text-center font-medium truncate">
                    {selectedVideo.name}
                  </p>
                </div>

                {/* Playback controls overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-white">⏯️</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 animate-pulse">
                <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <p className="text-gray-400 font-medium">No video selected</p>
                <p className="text-gray-600 text-sm mt-1">
                  Choose a video to preview it here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-8 space-y-4 animate-fade-in-up delay-200">
          <label className="block">
            <input
              type="file"
              accept="video/*"
              onChange={pickVideo}
              disabled={isLoading}
              className="hidden"
              id="videoInput"
            />
            <button
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/25"
              } relative overflow-hidden group`}
              onClick={() => document.getElementById("videoInput").click()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "📁 Pick Video"
              )}
            </button>
          </label>

          {selectedVideo && (
            <div className="space-y-3 animate-fade-in-up">
              <button
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-green-500/25 shadow-lg relative overflow-hidden group"
                onClick={simulateSetWallpaper}
                disabled={isApplying}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="flex items-center justify-center">
                  🎬 Set as Wallpaper
                  {isApplying && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                  )}
                </span>
              </button>

              <button
                className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-red-500/25 shadow-lg opacity-90 hover:opacity-100"
                onClick={clearSelection}
              >
                🗑️ Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10 animate-fade-in-up delay-300 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              How to use:
            </span>
          </h3>
          <div className="space-y-3">
            {[
              "Tap 'Pick Video' to select a video from your device",
              "Preview the video in the player above",
              "Tap 'Set as Wallpaper' to apply it",
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-3 group">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm flex-1 group-hover:text-white transition-coluration-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 animate-fade-in-up delay-400 hover:shadow-cyan-500/10 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              💡 Pro Tips:
            </span>
          </h3>
          <div className="space-y-2 text-sm">
            {[
              "Use short videos for better performance",
              "Landscape videos work best for wallpapers",
              "Keep file size under 50MB",
              "Ensure good lighting in videos",
              "Use MP4 format for compatibility",
            ].map((tip, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                <span className="text-cyan-100/80 group-hover:text-cyan-50 transition-colors">
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wallpaper Application Animation */}
      {isApplying && <ApplicationStages />}

      {/* Add custom animations to Tailwind */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoWallpaperApp;
