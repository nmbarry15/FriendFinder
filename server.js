var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var resultsFriend;

var friends = [
    {
        name: "Meredith Grey",
        photo: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_395/https://cartermatt.com/wp-content/uploads/2012/10/9-Meredith-e1349824712117.jpg",
        scores: [1, 2, 3, 4, 5, 3, 2, 3, 3, 1],
        routeName: "meredithgrey"
    },
    {
        name: "Jackson Avery",
        photo: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_394/https://cartermatt.com/wp-content/uploads/2012/10/9-Jackson-e1350513624526.jpg",
        scores: [1, 3, 3, 1, 5, 5, 2, 3, 3, 1],
        routeName:"jacksonavery"
    },
    {
        name: "Alex Karev",
        photo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Dr._Alex_Karev.jpg/220px-Dr._Alex_Karev.jpg",
        scores: [1, 3, 3, 1, 1, 5, 2, 5, 3, 2],
        routeName: "alexkarev"
    }
];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"))
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"))
});

app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

app.get("/api/modal", function(req, res) {
    return res.json(resultsFriend);
});

app.post("/api/friends", function (req, res) {
    var newFriend = req.body;

    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    console.log(newFriend);

    resultsFriend = whoIsMyBestFriend(newFriend);

    console.log("Best Friend is ", resultsFriend);

    friends.push(newFriend);

    res.json(newFriend);
});

function whoIsMyBestFriend(newFriend) {
    var totalDifference = 50;
    var bestFriend;
    for (var i = 0; i < friends.length; i++) {
        var friendScores = friends[i].scores;
        var newDifference = 0;

        for (var j = 0; j < newFriend.scores.length; j++) {
            var num = Math.abs(parseInt(newFriend.scores[j]) - parseInt(friendScores[j]))
            newDifference += num;
        }

        if (newDifference < totalDifference) {
            totalDifference = newDifference;
            bestFriend = friends[i]
        }
    }
    return bestFriend;
};

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});