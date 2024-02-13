const shortid=require("shortid");
const URL=require("../models/url");

async function generateShortUrl(req,res){
    if(!(req.body.url)) return res.status(400).json({error:"Url Needed"});
    const shortId=shortid();
    const result=await URL.create({
        shortId: shortId,
        redirectURL: req.body.url,
        visitHistory:[]
    });
    const allUrls=await URL.find({});
    return res.render("home",{
        urls: allUrls
    });
}

async function showAllEntries(req,res){
    const allUrls=await URL.find({});
    return res.render("home",{
        urls: allUrls
    });
}

async function SHORTid(req,res){
    const shortID=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId: shortID},
        {$push: {visitHistory: {timestamp: Date.now()}}});
    res.status(200).redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await URL.findOne({shortId: shortId});
    return res.status(200).json({ Clicks: result.visitHistory.length, Analystics: result.visitHistory});
}



module.exports={
    generateShortUrl,
    showAllEntries,
    SHORTid,
    handleGetAnalytics
};