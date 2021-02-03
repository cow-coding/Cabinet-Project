// routes/index.js

module.exports = function (app, fs, crypto, User) {
  const notUser =
    '<script type="text/javascript">alert("존재하지 않는 학생입니다."); window.location="/";</script>';

  // Home API
  app.get("/", function (req, res) {
    var sess = req.session;

    res.render("index");
  });

  // Login API
  app.post("/login", function (req, res) {
    var currID = req.body.studentID;
    var currName = req.body.name;

    User.findOne({ studentID: currID }, function (err, user) {
      if (err) {
        console.error(err);
        return;
      }

      if (!user) {
        // console.log("Not found");
        res.send(notUser);
      } else {
        console.log(
          `student id: ${user.studentID}, name: ${user.name}, isPay:${user.isPay}`
        );

        res.redirect("/");
      }
    });
  });

  // Create User API for testing user make
  app.post("/create/user", function (req, res) {
    var user = new User();
    user.studentID = req.body.studentID;
    user.name = req.body.name;
    user.isPay = req.body.isPay;

    user.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }

      res.json({ result: 1 });
    });
  });
};
