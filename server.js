const express=require("express");
const cors=require("cors");
const {execFile}=require("child_process");
const app=express(), PORT=process.env.PORT||3000;
app.use(cors()); app.use(express.json());
app.use(express.static("public"));
const formats={
 ultra:"bestvideo*+bestaudio/best",
 "1080":"bestvideo*[height<=1080]+bestaudio/best[height<=1080]",
 "780":"bestvideo*[height<=780]+bestaudio/best[height<=780]",
 hd:"bestvideo*[height<=720]+bestaudio/best[height<=720]"
};
app.get("/api/health",(req,res)=>res.json({ok:true}));
app.post("/api/download",(req,res)=>{
 const {url,quality="1080"}=req.body||{};
 if(!url||!/^https?:\/\/(www\.)?tiktok\.com\//i.test(url))
  return res.status(400).json({success:false,message:"Valid TikTok URL required."});
 execFile("yt-dlp",["--no-playlist","--no-warnings","--get-url","-f",formats[quality]||formats["1080"],url],
 {timeout:60000,maxBuffer:1024*1024},(err,stdout)=>{
  if(err||!stdout.trim()) return res.status(500).json({success:false,message:"Could not resolve media."});
  const lines=stdout.trim().split(/\r?\n/);
  res.json({success:true,type:"video",quality,download_url:lines[lines.length-1].trim()});
 });
});
app.listen(PORT,()=>console.log("Server listening on "+PORT));