const sdk = require("node-appwrite");
const fs = require('fs');
const { Query } = require("appwrite");

const client = new sdk.Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("64f1a389936d60327f76")
    .setKey("86065a26d2bd3db58edae7db7a3805b737ec1a60dbdcf26db02afe3b75d1fcb3f8b999bd2400acd7848c2236f7c8507cbf5379d789238dcd210eb4e8e8bbe25f506770997404ad4a9eaa533323340566c34957660fa99f7e8edbf7c7dcb0b7879cab751108f9197cf1f57f1b0cbc922464729b4c874eb149d4a1d8d5064a1411");

const databases = new sdk.Databases(client);

getRoadmaps();

async function getRoadmaps() {
    var blogs = await databases.listDocuments(
        "lms_db", 
        "blogs",
        [
            Query.select(['$id']),
            Query.limit(100)
        ]
    );
    
    var text = "";
    blogs.documents.forEach(roadmap => {
        text += "/read/"+roadmap.$id + "\n";
    });

    

    fs.writeFile("routes.txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("****** All routes generated ********!");
    }); 
}